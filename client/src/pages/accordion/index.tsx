import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import {
  CREATE_ACCORDIONS_ROUTE,
  DELETE_ACCORDIONS_ROUTE,
  EDIT_ACCORDIONS_ROUTE,
  GET_ACCORDIONS_ROUTE,
} from "@/utils/constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MdEditSquare } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { spawn } from "child_process";

const Accordion = () => {
  const [accordionData, setAccordionData] = useState([]);

  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [editId, setEditId] = useState("");
  const [page, setPage] = useState(1);

  const getAllAccordions = async () => {
    try {
      const response = await apiClient.get(GET_ACCORDIONS_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200 && response.data.accordions) {
        setAccordionData(response.data.accordions);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during fetching all the accordion", error.message);
      }
    }
  };
  useEffect(() => {
    getAllAccordions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questionInput && answerInput) {
      if (editId) {
        try {
          const response = await apiClient.put(
            `${EDIT_ACCORDIONS_ROUTE}/${editId}`,
            { questionInput, answerInput },
            { withCredentials: true }
          );
          if (response.status === 200 && response.data.editedAccordion) {
            setQuestionInput("");
            setAnswerInput("");
            setEditId("");
            toast.success("Accordion Edited successfully.");
            getAllAccordions();
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error during editing the accordion", error.message);
          }
        }
      } else {
        try {
          const response = await apiClient.post(
            CREATE_ACCORDIONS_ROUTE,
            { questionInput, answerInput },
            { withCredentials: true }
          );
          if (response.status === 201 && response.data.newAccordion) {
            setQuestionInput("");
            setAnswerInput("");
            toast.success("Accordion created successfully.");
            getAllAccordions();
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error during creating new accordion", error.message);
          }
        }
      }
    } else {
      toast.error("Please fill question and answer first.");
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(accordionData.length / 10) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 p-5">
      <Link to="/chat" className="text-white bg-green-500 rounded-lg p-2 ">
        Back to chat
      </Link>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-3/4 p-10 flex flex-col gap-4 bg-white rounded-lg"
      >
        <Input
          placeholder="Enter accordion question"
          className="border border-gray-500"
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
        />
        <Input
          placeholder="Enter accordion answer"
          className="border border-gray-500"
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
        />
        <Button type="submit" className="bg-orange-500 hover:bg-orange-400">
          {`${editId ? "Edit" : "Submit"} Accordion`}
        </Button>
      </form>
      <div className="p-4">
        <div className="p-4 bg-gray-200 rounded-lg">
          {accordionData.length > 0 &&
            accordionData
              .slice(page * 10 - 10, page * 10)
              .map((accordion) => (
                <SingleAccordion
                  key={accordion._id}
                  question={accordion.question}
                  answer={accordion.answer}
                  id={accordion._id}
                  getAllAccordions={getAllAccordions}
                  setAnswerInput={setAnswerInput}
                  setQuestionInput={setQuestionInput}
                  setEditId={setEditId}
                />
              ))}
        </div>
        {accordionData.length > 0 && (
          <div className="text-2xl flex gap-5 justify-center items-center text-white my-5">
            <button
              className={`${page < 1 ? "hidden" : ""} border p-3`}
              onClick={() => selectPageHandler(page - 1)}
            >
              prev
            </button>
            {[...Array(Math.ceil(accordionData?.length / 10))].map(
              (_, index) => (
                <button
                  key={index}
                  className={`${
                    page === index + 1 ? "bg-green-500" : ""
                  } border p-3`}
                  onClick={() => selectPageHandler(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              className={`${
                page > Math.ceil(accordionData.length / 10) ? "hidden" : ""
              } border p-3`}
              onClick={() => selectPageHandler(page + 1)}
            >
              next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const SingleAccordion = ({
  question,
  answer,
  id,
  getAllAccordions,
  setQuestionInput,
  setAnswerInput,
  setEditId,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [openNewAccordionDeleteModal, setOpenNewAccordionDeleteModal] =
    useState(false);
  const handelDelete = async (id) => {
    try {
      const response = await apiClient.delete(
        `${DELETE_ACCORDIONS_ROUTE}/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200 && response.data.deletedAccordion) {
        toast.success("Accordion deleted successfully.");
        getAllAccordions();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during deleting the accordion", error.message);
      }
    }
  };

  const handleEdit = () => {
    setQuestionInput(question);
    setAnswerInput(answer);
    setEditId(id);
  };

  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
        <button
          className="flex justify-between flex-1 pr-5 items-center"
          onClick={() => setAccordionOpen(!accordionOpen)}
        >
          <span>{question}</span>
          {/* <span>{`${accordionOpen ? "-" : "+"}`}</span> */}
          <div className="">
            <svg
              className="fill-indigo-500 shrink-0"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`transform origin-center transition duration-200 ease-out ${
                  accordionOpen && "!rotate-180"
                }`}
              />
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                  accordionOpen && "!rotate-180"
                }`}
              />
            </svg>
          </div>
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-700 rounded-lg text-white cursor-pointer">
            <MdEditSquare onClick={() => handleEdit()} />
          </div>
          <div className="p-2 bg-blue-700 rounded-lg text-white cursor-pointer">
            {/* <FaTrash onClick={() => handelDelete(id)} /> */}
            <FaTrash onClick={() => setOpenNewAccordionDeleteModal(true)} />
          </div>
        </div>
      </div>
      <div
        className={` grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        } `}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
      <Dialog
        open={openNewAccordionDeleteModal}
        onOpenChange={setOpenNewAccordionDeleteModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you suare you want to delete it?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-5">
            <button
              className="bg-green-500 p-2 rounded-lg"
              onClick={() => handelDelete(id)}
            >
              Confirm
            </button>
            <button
              className="bg-red-500 p-2 rounded-lg text-white"
              onClick={() => setOpenNewAccordionDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Accordion;
