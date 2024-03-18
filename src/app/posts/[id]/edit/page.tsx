"use client";

import { firebaseStorage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CiImageOn, CiYoutube } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";

const EditPostPage = ({ params }: any) => {
  const { id } = params;
  const { data } = useSession();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);

  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  useEffect(() => {
    const getData = async () => {
      const cateResp = await fetch(process.env.SERVER_URL + `/api/categories`);
      const categories = await cateResp.json();

      categories?.length && setCategories(categories);

      const resp = await fetch(process.env.SERVER_URL + `/api/posts/${id}`);
      const post = await resp.json();

      post?.title && setTitle(post.title);
      post?.description && setContent(post.description);

      setCategoryId(post.category.id);

      if (data?.user?.email !== post?.user?.email) {
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const upload = () => {
      const fileName = Date.now() + "-" + file.name.split(".")[0];
      const storageRef = ref(firebaseStorage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log("upload failed: ");
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImgUrl(downloadURL);
            toast("img uploaded successfully", { type: "success" });
          });
        }
      );
    };

    file && upload();
  }, [file]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const resp = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          ...(imgUrl && { image: imgUrl }),
          description: content,
          categoryId: categoryId,
        }),
      });

      console.log(resp);

      if (resp.ok) {
        router.push(`/posts/${id}`);
        toast("post updated successfully", { type: "success" });
        return;
      } else {
        toast("post updated fail", { type: "error" });
      }
    } catch (error) {
      toast("post updated error", { type: "error" });
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl xl:text-4xl font-medium">Create New Post</h1>
      <input
        type="text"
        className="px-4 py-4 rounded-md w-full text-2xl xl:text-4xl bg-transparent border border-slate-300 dark:border-slate-600"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="space-y-4">
        <label htmlFor="category" className="block text-xl">
          Category:{" "}
        </label>
        <select
          name="category"
          id="category"
          className="w-32 p-2 text-slate-700 dark:text-slate-300 bg-transparent border border-slate-200 dark:bg-slate-700 focus:outline-none rounded-md"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            none
          </option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-8">
        <button
          className="p-2 rounded-full border border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={() => setOpen(!open)}
        >
          <GoPlus />
        </button>

        {open && (
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setFile(e.target.files?.[0])}
            />
            <label htmlFor="image">
              <div className="p-2 rounded-full border border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
                <CiImageOn />
              </div>
            </label>
            <button className="p-2 rounded-full border border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">
              <MdOutlineFileUpload />
            </button>
            <button className="p-2 rounded-full border border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">
              <CiYoutube />
            </button>
          </div>
        )}
      </div>

      <ReactQuill
        theme="bubble"
        value={content}
        onChange={setContent}
        className="border border-slate-300 dark:border-slate-600 rounded-md text-xl"
      />

      <button
        className="px-3 py-2 rounded-md bg-sky-500 hover:bg-sky-600 dark:hover:bg-sky-400"
        type="button"
        onClick={(e) => handleSubmit(e)}
      >
        update post
      </button>
    </div>
  );
};

export default EditPostPage;
