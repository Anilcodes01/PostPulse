import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handlePublish = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Failed to publish blog:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <Appbar />
      <div className="flex justify-center ">
        <div className="max-w-screen-lg w-full flex flex-col  pt-8">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Title..."
            className=" w-full outline-none p-4 text-black  text-4xl font-extrabold  rounded bg-gray-50    "
          />

          {/* <TextArea
            onChange={(e) => {
              setContent(e.target.value);
            }}
          /> */}

          <div className="pt-4">
            <Editor
              apiKey="5i2hotlss6fkqwz88af3yqq578kzp22a9u3pwamqrgm94cwy"
              value={content}
              init={{
                height: 500,
                width: "100%",
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",

                  content_style: `
                  body { 
                    font-family:Helvetica,Arial,sans-serif; 
                    font-size:14px; 
                    outline: none; 
                    box-shadow: none; 
                  }
                  .tox-tinymce, 
                  .tox-editor-container,
                  .tox-tinymce * {
                    outline: none !important;
                    box-shadow: none !important;
                  }
                `,
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          <div className="w-full flex flex-col items-center">
            <button
              onClick={handlePublish}
              className="  mt-4 bg-black text-white  w-24 h-10 rounded-full"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


