import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface TypeCKEDITOR {
  toolbar: string[];
  table: { contentToolbar: string[] };
  heading: {
    options: Array<{
      model: string;
      view?: string;
      title: string;
      class: string;
    }>;
  };
}
const CreateBlog = () => {
  const [editorData, setEditorData] = useState("");

  const configCKEditor: TypeCKEDITOR = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "|",
      "insertTable",
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "|",
      "undo",
      "redo",
      "|",
      "alignment",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
      "codeBlock",
      "|",
      "mediaEmbed",
      "imageUpload",
      "horizontalLine",
      "specialCharacters",
    ],
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
      ],
    },
  };

  return (
    <>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          Danh sách tin tức
        </p>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <div className="w-full h-full ">
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            config={configCKEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorData(data);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
