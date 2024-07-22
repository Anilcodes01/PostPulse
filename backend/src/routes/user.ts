import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@anil_codes/common_module";



export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Something's up with your inputs, please check it again!",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name,
    },
  });

  const jwt = await sign(
    {
      id: user.id,
    },
    c.env.JWT_SECRET
  );

  return c.text(jwt);
});

userRouter.post("/signin", async (c) => {

  const body = await c.req.json();

  const {success} = signinInput.safeParse(body);

  if(!success) {
    c.status(403);
    return c.json({
      message: "Something's up with your inputs, please check it again!"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({
      message: "User not found in our database!",
    });
  }

  const jwt = await sign(
    {
      id: user.id,
    },
    c.env.JWT_SECRET
  );

  return c.json({
    token: jwt,
    userId: user.id
  })
});
