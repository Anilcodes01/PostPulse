import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {
  createBlogInput,
  CreateBlogInput,
  updateBlogInput,
} from "@anil_codes/common_module";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const user = await verify(authHeader, c.env.JWT_SECRET);

  if (user) {
    c.set("userId", user.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      message: "You're not logged in, please login first!",
    });
  }
});

blogRouter.post("/", async (c) => {
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({
      message: "Something's up with your inputs, please check it again!",
    });
  }

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId),
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

blogRouter.get("/author/:authorId", async (c) => {
  console.log("Fetching blogs for author ID:", c.req.param('authorId'));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.req.param("authorId");
  try {
    const myBlogs = await prisma.blog.findMany({
      where: {
        authorId: Number(authorId),
      },
      select: {
        title: true,
        content: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      blogs: myBlogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error); // Log any errors
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is properly disconnected
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  const blog = await prisma.blog.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blog,
  });
});

blogRouter.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  const deleteBlog = await prisma.blog.delete({
    where: {
      id: Number(id),
    },
  });

  return c.json({
    message: "Blog deleted successfully!",
    deletedBlog: deleteBlog,
  });
});

// blogRouter.put("/", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const body = await c.req.json();

//   const { success } = updateBlogInput.safeParse(body);
//   if (!success) {
//     c.status(403);
//     return c.json({
//       message: "Something's up with your inputs, please check it again!",
//     });
//   }

//   const blog = await prisma.blog.update({
//     where: {
//       id: body.id,
//     },
//     data: {
//       title: body.title,
//       content: body.content,
//     },
//   });

//   return c.json({
//     id: blog.id,
//   });
// });

blogRouter.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const { id } = c.req.param();
    const body = await c.req.json();

    const { success, error } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({
        message:
          "Invalid input: " + error?.errors.map((e) => e.message).join(", "),
      });
    }

    const blog = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    c.status(500);
    return c.json({
      message: "An error occurred while updating the blog.",
    });
  } finally {
    await prisma.$disconnect();
  }
});
