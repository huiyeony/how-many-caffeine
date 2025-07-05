import { useState } from "react";
import "./EditorPage.css";
import { supabase } from "../supabase";
import Footer from "@/components/Footer";
export default function EditorPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1");

    const { error } = await supabase.from("news").insert([{ title, content }]);

    if (error) {
      console.error(error);
      return;
    }
  };
  return (
    <>
      <div className="editor-wrapper">
        <form onSubmit={handleSubmit} className="editor-form">
          <div className="editor-heading">아티클 작성하기 </div>
          <input
            type="text"
            required
            placeholder="제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="editor-input"
          />
          <textarea
            rows={15}
            placeholder="내용을 입력해주세요.."
            required
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="editor-textarea"
          />
          <div className="editor-button-group">
            <button className="editor-submit-button" type="submit">
              {"제출하기"}
            </button>
            <button className="editor-back-button">돌아가기</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
