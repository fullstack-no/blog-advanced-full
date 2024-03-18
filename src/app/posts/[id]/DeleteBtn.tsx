"use client";

import { Box, Button, Modal, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type DeleteBtnProps = {
  id: React.ReactNode;
};

export const DeleteBtn = ({ id }: DeleteBtnProps) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      console.log("delete post");
      const resp = await fetch(process.env.SERVER_URL + `/api/posts/${id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        router.push("/");
        toast("post deleted successfully", { type: "success" });
        return;
      } else {
        toast("post deleted failed", { type: "error" });
      }
    } catch (error) {
      toast("Delete failed", { type: "error" });
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        className="px-3 py-2 rounded-md border border-slate-200 bg-red-500 hover:bg-red-400 dark:hover:bg-red-600"
        onClick={() => setOpen(true)}
      >
        Delete
      </button>

      {/* modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-md w-full max-w-md max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain rounded-md divide-y divide-slate-200 ">
          <h1 className="text-xl font-bold text-red-500 px-4 py-4">
            Delete Confirmation
          </h1>

          <div className="px-4 py-8 text-black">
            <p>Are you sure to delete this post?</p>
          </div>

          <div className="flex items-center gap-4 p-4 justify-end">
            <button
              className="px-3 py-2 border border-slate-300 rounded-md bg-slate-500 hover:bg-slate-600 text-white"
              onClick={() => setOpen(false)}
            >
              cancel
            </button>
            <button
              className="px-3 py-2 border border-slate-300 rounded-md bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDelete}
            >
              delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
