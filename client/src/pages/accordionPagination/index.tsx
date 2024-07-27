// frontend friven pagination logic

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { apiClient } from "@/lib/api-client";
// import {
//   CREATE_ACCORDIONS_ROUTE,
//   DELETE_ACCORDIONS_ROUTE,
//   EDIT_ACCORDIONS_ROUTE,
//   GET_ACCORDIONS_ROUTE,
// } from "@/utils/constants";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { MdEditSquare } from "react-icons/md";
// import { FaTrash } from "react-icons/fa";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Link } from "react-router-dom";

// const Accordion = () => {
//   const [accordionData, setAccordionData] = useState([]);

//   const [questionInput, setQuestionInput] = useState("");
//   const [answerInput, setAnswerInput] = useState("");
//   const [editId, setEditId] = useState("");
//   const [page, setPage] = useState(1);

//   const getAllAccordions = async () => {
//     try {
//       const response = await apiClient.get(GET_ACCORDIONS_ROUTE, {
//         withCredentials: true,
//       });
//       if (response.status === 200 && response.data.accordions) {
//         setAccordionData(response.data.accordions);
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error during fetching all the accordion", error.message);
//       }
//     }
//   };
//   useEffect(() => {
//     getAllAccordions();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (questionInput && answerInput) {
//       if (editId) {
//         try {
//           const response = await apiClient.put(
//             `${EDIT_ACCORDIONS_ROUTE}/${editId}`,
//             { questionInput, answerInput },
//             { withCredentials: true }
//           );
//           if (response.status === 200 && response.data.editedAccordion) {
//             setQuestionInput("");
//             setAnswerInput("");
//             setEditId("");
//             toast.success("Accordion Edited successfully.");
//             getAllAccordions();
//           }
//         } catch (error) {
//           if (error instanceof Error) {
//             console.error("Error during editing the accordion", error.message);
//           }
//         }
//       } else {
//         try {
//           const response = await apiClient.post(
//             CREATE_ACCORDIONS_ROUTE,
//             { questionInput, answerInput },
//             { withCredentials: true }
//           );
//           if (response.status === 201 && response.data.newAccordion) {
//             setQuestionInput("");
//             setAnswerInput("");
//             toast.success("Accordion created successfully.");
//             getAllAccordions();
//           }
//         } catch (error) {
//           if (error instanceof Error) {
//             console.error("Error during creating new accordion", error.message);
//           }
//         }
//       }
//     } else {
//       toast.error("Please fill question and answer first.");
//     }
//   };

//   const selectPageHandler = (selectedPage) => {
//     if (
//       selectedPage >= 1 &&
//       selectedPage <= Math.ceil(accordionData.length / 10) &&
//       selectedPage !== page
//     ) {
//       setPage(selectedPage);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 p-5">
//       <Link to="/chat" className="text-white bg-green-500 rounded-lg p-2 ">
//         Back to chat
//       </Link>
//       <form
//         onSubmit={handleSubmit}
//         className="mx-auto w-3/4 p-10 flex flex-col gap-4 bg-white rounded-lg"
//       >
//         <Input
//           placeholder="Enter accordion question"
//           className="border border-gray-500"
//           value={questionInput}
//           onChange={(e) => setQuestionInput(e.target.value)}
//         />
//         <Input
//           placeholder="Enter accordion answer"
//           className="border border-gray-500"
//           value={answerInput}
//           onChange={(e) => setAnswerInput(e.target.value)}
//         />
//         <Button type="submit" className="bg-orange-500 hover:bg-orange-400">
//           {`${editId ? "Edit" : "Submit"} Accordion`}
//         </Button>
//       </form>
//       <div className="p-4">
//         <div className="p-4 bg-gray-200 rounded-lg min-h-[510px]">
//           {accordionData.length > 0 &&
//             accordionData
//               .slice(page * 10 - 10, page * 10)
//               .map((accordion) => (
//                 <SingleAccordion
//                   key={accordion._id}
//                   question={accordion.question}
//                   answer={accordion.answer}
//                   id={accordion._id}
//                   getAllAccordions={getAllAccordions}
//                   setAnswerInput={setAnswerInput}
//                   setQuestionInput={setQuestionInput}
//                   setEditId={setEditId}
//                 />
//               ))}
//         </div>
//         {accordionData.length > 0 && (
//           <div className="text-2xl flex gap-5 justify-center items-center text-white my-5">
//             <button
//               className={`${page === 1 ? "opacity-0" : ""} border p-3`}
//               onClick={() => selectPageHandler(page - 1)}
//             >
//               prev
//             </button>
//             {[...Array(Math.ceil(accordionData?.length / 10))].map(
//               (_, index) => (
//                 <button
//                   key={index}
//                   className={`${
//                     page === index + 1 ? "bg-green-500" : ""
//                   } border p-3`}
//                   onClick={() => selectPageHandler(index + 1)}
//                 >
//                   {index + 1}
//                 </button>
//               )
//             )}
//             <button
//               className={`${
//                 page < accordionData.length / 10 ? "" : "opacity-0"
//               } border p-3`}
//               onClick={() => selectPageHandler(page + 1)}
//             >
//               next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const SingleAccordion = ({
//   question,
//   answer,
//   id,
//   getAllAccordions,
//   setQuestionInput,
//   setAnswerInput,
//   setEditId,
// }) => {
//   const [accordionOpen, setAccordionOpen] = useState(false);
//   const [openNewAccordionDeleteModal, setOpenNewAccordionDeleteModal] =
//     useState(false);
//   const handelDelete = async (id) => {
//     try {
//       const response = await apiClient.delete(
//         `${DELETE_ACCORDIONS_ROUTE}/${id}`,
//         { withCredentials: true }
//       );
//       if (response.status === 200 && response.data.deletedAccordion) {
//         toast.success("Accordion deleted successfully.");
//         getAllAccordions();
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error during deleting the accordion", error.message);
//       }
//     }
//   };

//   const handleEdit = () => {
//     setQuestionInput(question);
//     setAnswerInput(answer);
//     setEditId(id);
//   };

//   return (
//     <div className="py-2">
//       <div className="flex justify-between items-center">
//         <button
//           className="flex justify-between flex-1 pr-5 items-center"
//           onClick={() => setAccordionOpen(!accordionOpen)}
//         >
//           <span>{question}</span>
//           {/* <span>{`${accordionOpen ? "-" : "+"}`}</span> */}
//           <div className="">
//             <svg
//               className="fill-indigo-500 shrink-0"
//               width="16"
//               height="16"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect
//                 y="7"
//                 width="16"
//                 height="2"
//                 rx="1"
//                 className={`transform origin-center transition duration-200 ease-out ${
//                   accordionOpen && "!rotate-180"
//                 }`}
//               />
//               <rect
//                 y="7"
//                 width="16"
//                 height="2"
//                 rx="1"
//                 className={`transform origin-center rotate-90 transition duration-200 ease-out ${
//                   accordionOpen && "!rotate-180"
//                 }`}
//               />
//             </svg>
//           </div>
//         </button>
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-blue-700 rounded-lg text-white cursor-pointer">
//             <MdEditSquare onClick={() => handleEdit()} />
//           </div>
//           <div className="p-2 bg-blue-700 rounded-lg text-white cursor-pointer">
//             {/* <FaTrash onClick={() => handelDelete(id)} /> */}
//             <FaTrash onClick={() => setOpenNewAccordionDeleteModal(true)} />
//           </div>
//         </div>
//       </div>
//       <div
//         className={` grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
//           accordionOpen
//             ? "grid-rows-[1fr] opacity-100"
//             : "grid-rows-[0fr] opacity-0"
//         } `}
//       >
//         <div className="overflow-hidden">{answer}</div>
//       </div>
//       <Dialog
//         open={openNewAccordionDeleteModal}
//         onOpenChange={setOpenNewAccordionDeleteModal}
//       >
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Are you suare you want to delete it?</DialogTitle>
//             <DialogDescription>
//               This action cannot be undone. This will permanently delete your
//               account and remove your data from our servers.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex gap-5">
//             <button
//               className="bg-green-500 p-2 rounded-lg"
//               onClick={() => handelDelete(id)}
//             >
//               Confirm
//             </button>
//             <button
//               className="bg-red-500 p-2 rounded-lg text-white"
//               onClick={() => setOpenNewAccordionDeleteModal(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Accordion;

// backend friven pagination logic

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

const AccordionPagination = () => {
  const [accordionData, setAccordionData] = useState([]);

  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [editId, setEditId] = useState("");
  const [page, setPage] = useState(1);
  const [totalAccordions, setTotalAccordions] = useState(0);
  const totalPages = Math.ceil(totalAccordions / 10);

  const getAllAccordions = async () => {
    try {
      const response = await apiClient.get(
        `${GET_ACCORDIONS_ROUTE}?limit=10&page=${page}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200 && response.data.accordions) {
        setAccordionData(response.data.accordions);
        setTotalAccordions(response.data.totalCounts);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during fetching all the accordion", error.message);
      }
    }
  };
  useEffect(() => {
    getAllAccordions(page);
  }, [page]);

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
      selectedPage <= Math.ceil(totalPages) &&
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
        <div className="p-4 bg-gray-200 rounded-lg min-h-[510px]">
          {accordionData.length > 0 &&
            accordionData.map((accordion) => (
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
              className={`${page === 1 ? "opacity-0" : ""} border p-3`}
              onClick={() => selectPageHandler(page - 1)}
            >
              prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`${
                  page === index + 1 ? "bg-green-500" : ""
                } border p-3`}
                onClick={() => selectPageHandler(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`${page < totalPages ? "" : "opacity-0"} border p-3`}
              onClick={() => selectPageHandler(page + 1)}
            >
              next
            </button>
          </div>
        )}
      </div>

      <SingleOpenCloseAccordion />
      {/* <div className="h-[100vh] w-100vw bg-gray-200 overflow-y-auto p-5 m-5 rounded-lg no-scrollbar">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore
        voluptate at, nesciunt asperiores fuga optio quibusdam doloribus numquam
        perferendis soluta doloremque excepturi officiis hic? Quasi expedita
        pariatur cupiditate, error consequuntur, laboriosam nesciunt modi
        laborum dolorem quo in totam soluta debitis! Deserunt, fuga aliquam
        maxime harum totam deleniti sint quidem quae in quam delectus excepturi
        aliquid. Aliquam provident quam officiis, laborum tempora itaque? Ab
        enim eius nisi deserunt accusantium at molestiae, veniam blanditiis
        reprehenderit perferendis ipsam quam quasi praesentium sint laborum nam
        distinctio sit asperiores perspiciatis esse. Fugit, autem fuga magni
        totam quae accusamus accusantium inventore aperiam architecto voluptatem
        exercitationem impedit sunt suscipit quo dignissimos? Sit nihil
        molestiae autem vero nemo, odio debitis quo optio qui incidunt earum
        unde error necessitatibus sequi voluptate? Omnis magnam ad id quo!
        Voluptatibus temporibus, qui illum necessitatibus esse eaque quos
        placeat recusandae impedit praesentium harum voluptate, amet quam
        excepturi autem quia architecto tempore aliquid modi nam accusamus non
        eveniet. Ipsam qui ducimus quaerat nulla soluta mollitia nobis placeat,
        animi, perferendis cupiditate commodi! Rerum ex quia atque dolores!
        Nulla sit, aliquam quibusdam voluptatibus rem culpa numquam repudiandae
        laboriosam, nisi facilis facere itaque, animi voluptate. Dolorum maxime
        repellat minima iste reprehenderit incidunt voluptatum dicta ratione
        harum ducimus voluptate voluptatem sit fugit similique omnis, earum
        exercitationem inventore quia dolores placeat iusto? Iure sit cupiditate
        temporibus velit iusto deleniti dolorem suscipit laudantium voluptatibus
        mollitia ex unde cumque veritatis, reprehenderit maiores obcaecati nobis
        iste ratione animi sequi? Quae quos fuga deserunt excepturi, nostrum
        incidunt asperiores distinctio iusto, minus veniam at vero blanditiis
        numquam sit molestiae temporibus adipisci atque cupiditate error
        molestias ratione aliquam magni natus. Aspernatur, explicabo? Deserunt
        ipsum suscipit aspernatur culpa ratione illum dolores, aliquam aperiam
        repudiandae magnam odit eum sequi incidunt iusto, ipsam cupiditate
        doloribus nihil eius amet, id quaerat debitis ducimus. Non omnis quos
        dolor. Dolorum eius ad, temporibus earum accusantium nemo reiciendis
        amet, quidem alias quae officiis beatae, molestiae incidunt! Unde eos,
        fugit deleniti vitae deserunt similique, eius cumque recusandae
        excepturi nostrum perferendis aut qui eum eligendi velit veniam, dolore
        est beatae? Iure illo tempore saepe temporibus repellendus iusto porro
        optio quisquam omnis aperiam sit, illum fuga eos, voluptatibus laborum!
        Corporis, non pariatur optio explicabo laboriosam quaerat! Iusto at quae
        doloremque distinctio, quod sit laboriosam, modi debitis ex quos
        consequatur et laborum reprehenderit, ipsam alias explicabo ad illo
        veniam ipsum accusamus. Ex, deleniti dolore. Facere, nihil blanditiis
        minus quas voluptatem harum necessitatibus aliquam optio voluptate dolor
        nostrum sapiente vel numquam eveniet odio laborum sint, corporis
        quibusdam exercitationem. Ut repellendus nihil qui cupiditate, iusto
        repudiandae officia ipsam asperiores. Facilis soluta nostrum aperiam ex
        animi autem alias eveniet quasi provident sapiente aspernatur,
        voluptatibus, esse laboriosam explicabo iure consectetur consequuntur
        veritatis accusantium iusto sequi fugit nobis quisquam adipisci. Optio
        maxime nesciunt hic mollitia rem porro sit laboriosam at. Atque ducimus
        delectus dolores quas tenetur, nobis officia porro eligendi possimus
        perspiciatis nesciunt, consectetur vel quo, temporibus vero magni
        doloremque numquam sapiente fugit. Doloremque exercitationem
        perspiciatis ipsum voluptatum eum facilis alias veritatis, iste pariatur
        odio itaque blanditiis eligendi, corporis esse nihil totam, quam aliquid
        consectetur laudantium possimus minus tempore inventore beatae! Atque
        voluptates, fugit dolorem maxime ab voluptatibus! Dolor doloremque
        dolore obcaecati quae natus reprehenderit commodi, nostrum ullam et
        officiis hic recusandae error, pariatur autem, libero ipsa numquam. Ipsa
        a quia aliquid quae rem magnam itaque labore architecto soluta quaerat
        maiores similique, natus optio doloremque in ab impedit exercitationem?
        Reiciendis dolor quae, maxime rem repellat ad illum tenetur porro libero
        laudantium deserunt atque molestias minima vitae. Dolorem, a adipisci
        magni nostrum possimus nam culpa ea ratione nobis. Eveniet ad blanditiis
        illum quo sit sequi eos ab hic quaerat! Placeat, repellat eligendi earum
        sunt consequuntur odio distinctio sapiente inventore harum amet. Nulla
        incidunt rem accusamus placeat culpa assumenda libero accusantium
        adipisci velit debitis. Unde voluptate enim incidunt dolorem deserunt
        officiis, cum totam accusamus minima laudantium labore, consectetur
        dolore magnam provident autem at eum facilis animi officia repellendus
        eligendi aspernatur ullam ipsam! Consequuntur at minus deleniti deserunt
        eligendi magni nobis, reprehenderit excepturi fuga tenetur adipisci,
        aliquam maxime. Sed, eius aliquam, laudantium accusamus illo voluptate
        quod animi earum adipisci id culpa fugit nesciunt! Ullam magnam
        accusantium quibusdam voluptatem libero voluptatibus laborum, nam fugit
        delectus, incidunt tenetur quod molestiae necessitatibus dignissimos
        laboriosam ea repellendus, labore rerum doloremque? Excepturi dolorum
        sit repellendus natus id asperiores? Voluptatem, dicta est maxime vitae
        adipisci excepturi eligendi consequuntur quaerat distinctio ipsam
        temporibus sequi iste velit eum natus eius nulla rerum fugit molestiae
        blanditiis odio tempora tempore deserunt nemo. Modi maxime est amet
        voluptatibus molestias, iusto ipsam dolorem quibusdam ratione omnis
        accusamus. A id corporis pariatur quo eaque asperiores adipisci
        aspernatur ipsa ipsam non et illum nobis rerum doloribus doloremque
        necessitatibus error aliquid ea, dolore accusantium esse velit assumenda
        quisquam. Nostrum, ullam, doloribus ea recusandae esse accusantium
        maiores veniam pariatur non veritatis distinctio possimus rem sunt
        consequuntur doloremque voluptatibus sapiente deserunt reiciendis magni
        debitis, corrupti incidunt sed accusamus. Sapiente fugit totam tenetur
        dolorum ipsam? Repellendus dolorum reiciendis sunt veniam illo, nesciunt
        expedita maxime nobis nostrum molestiae, voluptates qui ipsum fuga
        consequatur atque asperiores in explicabo aliquid fugiat dignissimos
        beatae! Dolores natus eligendi sit placeat ullam ad cumque sint iure,
        maiores cupiditate architecto necessitatibus, dolorem consequuntur, eos
        aut assumenda ipsa exercitationem nesciunt nisi! Aliquam velit
        consequuntur sit aliquid quibusdam aperiam ut ducimus expedita esse
        autem praesentium beatae magnam soluta ab, optio iste ullam tempore
        culpa possimus est odio porro. Deleniti rerum recusandae non iusto
        officia illo illum maiores tempore beatae ut possimus, voluptates atque
        dolore molestiae omnis aperiam voluptatibus eos architecto nam totam
        consequuntur. Excepturi obcaecati sit, alias perferendis ad dolore
        tempora aut expedita soluta explicabo adipisci natus voluptatum
        accusamus rem architecto voluptatibus. Ad, dolorum rem recusandae
        aliquid voluptas sapiente facilis rerum architecto qui molestias, vitae
        amet ipsam optio fuga? Mollitia magnam asperiores beatae totam
        necessitatibus quibusdam labore aperiam vero fugiat. Ullam beatae error
        maiores esse eaque earum eius ea suscipit ipsa cum culpa quisquam,
        facilis placeat modi quo nam reprehenderit non tenetur mollitia hic
        obcaecati exercitationem reiciendis recusandae alias. Iure soluta
        consequatur aperiam dolore voluptatem architecto corrupti aliquid,
        sapiente, culpa, eum aspernatur vero. Quo necessitatibus aut aspernatur
        quod. Neque distinctio accusantium molestiae maiores cum assumenda a
        sint nam! Possimus, aliquid fugiat aut quisquam facere inventore
        delectus modi vel hic expedita eius consequatur corrupti praesentium
        tenetur quo! Hic quia beatae sint odio officiis laborum cumque animi
        laudantium perferendis ipsam, possimus harum, nisi accusamus illum
        assumenda saepe maiores recusandae? A, consequatur. Ut magni similique
        iure exercitationem, ea illo autem vitae, molestiae numquam quidem
        aspernatur nulla quasi, minima eius omnis necessitatibus! Sequi fugiat,
        ex eum labore eveniet mollitia necessitatibus maxime blanditiis,
        provident officia optio error. Vero hic voluptate nam, fuga officiis
        repellat voluptates ad consequatur numquam error neque amet distinctio
        aliquid minima temporibus, pariatur tenetur repudiandae iusto omnis sed
        tempore quisquam vitae. Ab repellendus repellat, vero eos mollitia
        nostrum, unde commodi necessitatibus error laudantium, voluptates fugiat
        blanditiis magni porro ipsam praesentium quas. Inventore laborum ab
        quasi unde quia, facere illum perspiciatis quo veritatis repellat at?
        Facilis aperiam sint fugit eligendi, aliquid inventore, in, nihil
        obcaecati consequuntur quia minima quis dolorem ipsam quae quasi
        corrupti nam eius. Obcaecati quasi sint repellendus cumque vel culpa,
        dolores aut? Totam quaerat odit, repudiandae fuga repellat quia a.
        Explicabo, ullam consequatur. Nihil autem nesciunt doloribus
        reprehenderit culpa sed dignissimos nobis ducimus tempore placeat?
        Magnam doloribus asperiores, soluta sit autem labore id placeat quidem
        molestiae ducimus pariatur maiores dolorem facilis rem, ex tempora? Quod
        quis necessitatibus, id, autem aut inventore aspernatur sed quae
        mollitia placeat omnis vitae. Quasi voluptatum saepe labore maxime
        nostrum eum, beatae quidem accusantium, necessitatibus totam temporibus
        ut doloribus dolorem a veritatis est nam atque ipsam similique, dolorum
        pariatur doloremque excepturi sint. Quisquam nesciunt ipsam fugit
        voluptates veritatis illum iste numquam magnam odio et sed nobis
        necessitatibus expedita aliquam ex, neque totam in aut quos dolore.
        Ipsam dicta recusandae, nam aliquid, id, iste aut fugiat alias
        cupiditate perspiciatis necessitatibus assumenda! Aspernatur vero itaque
        repellat, laborum, culpa assumenda sapiente autem quam sunt aperiam fuga
        in quas cum blanditiis, maiores cumque? Porro aspernatur ducimus
        deleniti perspiciatis sit est inventore cupiditate repellendus odio
        nemo. Ea quis tempore doloremque quaerat eligendi. Optio, odio quo?
        Porro aperiam accusamus nam explicabo perferendis numquam quae veniam
        voluptas velit dolor fuga sunt hic molestiae doloribus unde vitae,
        laboriosam repellendus odit quaerat inventore voluptatibus quam. Cumque
        animi nobis rem assumenda fugiat voluptatibus, similique est aliquid a,
        porro beatae minus delectus consectetur. Inventore velit aspernatur
        nulla ipsam tenetur veniam aliquid porro ad deleniti fuga distinctio
        accusamus eveniet soluta facilis quasi repellendus aut beatae harum quis
        perferendis doloribus, et rem. Nulla commodi error assumenda vero quidem
        itaque, sed soluta non porro ratione exercitationem consequatur, iure
        dolore voluptas amet magni provident consectetur aspernatur ipsa minus
        eos quis? Et culpa est commodi inventore ea blanditiis at nesciunt
        tenetur laborum iure eaque architecto nulla ut soluta perferendis totam
        aspernatur reprehenderit beatae, nam adipisci cum repellat numquam
        officiis? Natus, maiores. Minus aliquid animi voluptatibus neque, beatae
        omnis. Inventore, doloremque! Repellendus neque corrupti velit
        aspernatur distinctio praesentium culpa eos qui aut aliquam sed
        consequatur, nam dicta iure fugiat? Iste, labore. Vitae, molestias! Quod
        temporibus natus laborum debitis rerum dolorum quidem nisi officiis
        quaerat quibusdam sit, totam deleniti eum! Laudantium similique
        molestiae blanditiis nesciunt voluptate modi sed quidem quaerat velit,
        rerum libero animi consequuntur consectetur ipsa a distinctio nihil ex
        facere quibusdam temporibus? Aliquid, ut adipisci culpa pariatur saepe
        magnam harum iure ducimus qui numquam dolores quam natus tenetur
        molestias eaque doloremque officiis quia laborum temporibus amet impedit
        ad enim at nostrum. Esse id beatae ab, nulla ducimus pariatur numquam
        tempora deleniti quis laborum sunt, cumque sint dolore. Excepturi sed
        fugit quae ullam possimus id reprehenderit quam qui provident autem.
        Impedit similique porro ea nemo, eveniet architecto libero, sapiente
        accusantium ut illo ipsum, numquam dolores obcaecati odit fugit
        doloribus. Ea rem consectetur, harum tenetur quos nulla corporis
        suscipit? Pariatur ipsum doloremque, quos facilis neque quam ut aperiam
        ab est! Possimus adipisci totam, quaerat maxime ex quo eveniet
        doloremque. Unde, possimus vitae, quo, dignissimos laborum saepe
        perspiciatis adipisci molestiae omnis itaque aliquam quae distinctio
        totam placeat id optio iste voluptatibus voluptas maiores minus
        molestias quaerat sequi! Nostrum ducimus laudantium qui iste, corrupti
        facilis harum ex, omnis rerum deleniti temporibus sit ullam, ipsum
        nobis! Repellat libero a iure eum commodi, corporis illo voluptate.
        Voluptas aut, fugit ratione, ducimus velit laudantium alias, officiis
        qui placeat sit veritatis amet blanditiis. Ex commodi non, eligendi
        placeat error voluptatibus omnis saepe dolorem magnam cum nihil nulla!
        Asperiores corrupti facere quia rem, amet culpa nostrum? Nemo, voluptate
        possimus. Tempora laboriosam minima soluta quibusdam quidem aliquam
        fugit enim! Amet ab repellendus ea corporis. A sed maiores repellat quod
        consequatur atque minus quis, officiis iure. Quisquam quasi quae
        accusantium sint, repudiandae incidunt quibusdam corrupti magnam itaque,
        sed reiciendis quia vero ab rerum, doloremque labore eligendi minus eum
        eveniet possimus cum sit doloribus? Eum fugiat rerum ab aliquid maxime
        debitis recusandae adipisci earum minima. Ab, reprehenderit assumenda
        cum quisquam provident in sapiente, sequi velit aliquam minus ipsum ea,
        quasi delectus nemo suscipit voluptate laudantium nihil? Tenetur eos
        quod voluptates itaque quaerat veritatis, nemo reprehenderit corporis
        cupiditate deserunt, eaque laboriosam deleniti velit consequuntur vero
        culpa aliquid magni sit nulla sed expedita, laudantium repudiandae?
        Nulla earum placeat dicta, non assumenda hic nemo perspiciatis,
        voluptatem, aperiam sed vitae sequi. Totam tenetur debitis sequi
        accusantium illo possimus, explicabo magni voluptas a vitae nam
        necessitatibus ab esse nihil repellendus eius nostrum veniam, voluptates
        autem culpa rerum. Eaque provident qui est autem voluptatem inventore
        assumenda omnis repudiandae exercitationem nobis dicta, iusto obcaecati
        saepe doloremque quibusdam quia aperiam fuga et perferendis incidunt?
        Dolorem vero deserunt odio, aliquam nihil alias quis voluptas sit.
        Quibusdam sit natus nam, eum exercitationem fugit harum. Optio
        aspernatur excepturi similique labore sed ipsa, obcaecati doloremque
        laborum molestiae asperiores molestias exercitationem laudantium animi
        amet quo ea quaerat tempora placeat culpa temporibus voluptatibus, quod
        natus vitae consequatur. Odio quas architecto magnam, eos quae
        voluptatem ducimus molestias? Dolores illo asperiores voluptates tempora
        quaerat, voluptatem dolore dolor quisquam consectetur fugit aliquam
        similique? Eligendi quibusdam ipsum nam, ipsam animi est adipisci illo
        fugiat provident eum dolore tempora dicta harum soluta voluptates
        eveniet quod odit sint iure, deleniti voluptatem rerum! Dolores, culpa
        ipsum reiciendis quos porro sunt nostrum quod esse excepturi accusantium
        libero tempore molestiae nemo ut, eum labore facilis a temporibus.
        Possimus esse pariatur delectus aut quisquam, sunt dicta! Similique
        exercitationem nostrum fugit sit suscipit quia sunt voluptatum aperiam
        dignissimos numquam error ipsam in molestiae ut rerum, a sequi eius
        vitae quis, asperiores libero eligendi! Ab dignissimos ea, fugiat
        commodi rerum iusto. Dicta voluptatibus accusamus placeat atque repellat
        in veritatis libero. Voluptatum, hic soluta excepturi velit omnis
        expedita earum, quod, iure tenetur pariatur facilis vitae nostrum
        voluptates repudiandae? Laboriosam eum unde quis distinctio optio magni
        ea possimus molestias vitae, cupiditate necessitatibus rem eius, vel
        ipsum assumenda odit impedit praesentium tempora non nihil at
        accusantium illo nesciunt doloremque? Vero eum ab voluptas debitis unde,
        aliquid asperiores aspernatur nulla excepturi nobis illo, ut itaque
        perspiciatis, iusto a ipsum minima laboriosam ullam tempora culpa
        deleniti officiis magnam? Deserunt odio odit accusantium voluptatibus
        sapiente consequuntur rerum similique sint necessitatibus eum. Laborum
        nemo autem recusandae illum minus neque necessitatibus minima reiciendis
        a quo, tempora at in quibusdam veritatis. At dolorum, temporibus sed
        dolore ducimus laudantium molestias fugiat nihil pariatur ad porro eos
        itaque maxime corrupti delectus corporis voluptatibus nostrum fuga magni
        exercitationem iure explicabo. Praesentium accusantium temporibus labore
        nam libero quidem, nulla corrupti laboriosam corporis deleniti quod,
        ratione accusamus incidunt tempore porro quia, tempora modi perspiciatis
        dignissimos! Et quisquam, consequuntur doloremque necessitatibus ut modi
        dolorem magni a aliquam perferendis culpa quos sunt quidem autem,
        tempore ducimus similique cupiditate reprehenderit soluta iusto, odio
        laborum. Architecto culpa deserunt excepturi, nisi eveniet, enim
        corrupti in sed debitis sint quisquam unde cumque maxime facilis
        repudiandae illum non ducimus? Magnam delectus dolor magni eius earum
        alias at saepe maxime accusamus, facere, cumque provident nisi minima
        architecto repudiandae! Maxime repellat quod eaque commodi suscipit, aut
        illum ut tempore vel hic consectetur natus cum iste, placeat impedit
        dicta ab praesentium molestiae libero dolorem quas fugiat architecto
        necessitatibus. Ipsa aut nobis voluptates. Omnis laborum saepe a impedit
        placeat suscipit vitae quam magnam distinctio laboriosam doloribus
        delectus totam odio aspernatur cupiditate, alias veniam quas maxime
        minus! Nisi neque natus necessitatibus, iure, excepturi ipsum
        exercitationem amet optio quia praesentium beatae cupiditate laborum
        accusantium quod laboriosam. Magnam adipisci commodi voluptate dolorum
        blanditiis excepturi quis ex, cumque itaque totam eum necessitatibus
        possimus ad repellendus ratione, consectetur dicta ipsum! Quia quo ullam
        rem placeat porro, consequatur ad numquam deleniti voluptates quas
        maxime minus repellendus repellat quod dolorum tenetur quidem quos
        voluptate corporis nostrum provident adipisci cum sint. Quae eos impedit
        dolorum necessitatibus nostrum fugit molestiae sapiente neque amet
        dicta, inventore minus adipisci iste labore expedita ducimus magni
        laudantium, dolorem dolore pariatur quam? Exercitationem, suscipit eum!
        Sed, voluptatibus ipsam quas, nobis vel nemo temporibus labore, magni
        aperiam quo quibusdam sequi eaque? Eligendi accusamus mollitia corporis
        necessitatibus dolorem beatae consectetur illum iure quaerat, delectus
        enim laborum aperiam? Harum similique praesentium aspernatur, asperiores
        eos odio officia deserunt reiciendis, quidem fugiat cumque recusandae,
        sint sapiente at molestias officiis neque? Nisi vero dolore porro aut
        doloribus sequi perspiciatis maxime fugit dignissimos laboriosam nam
        quidem, sed tempore repellendus modi ducimus eligendi itaque molestiae
        sunt provident voluptates! Error ad et, enim fugiat ullam amet quam,
        debitis quod suscipit blanditiis nobis perspiciatis voluptatem veniam
        dolorem ex illum. Reiciendis non maxime, inventore officia pariatur
        assumenda minus! Corrupti voluptatem culpa amet quidem repellat
        accusamus at ducimus rem excepturi tenetur inventore maxime molestias
        odit quaerat aliquam incidunt, saepe velit doloremque. Iure corrupti
        dolorem repellendus vel quibusdam quam incidunt enim autem voluptas
        nobis consequatur laborum asperiores delectus architecto, culpa
        exercitationem nulla dolores quos nihil facere cumque non? Pariatur quia
        incidunt laborum! Eius, laudantium minus reiciendis quae alias
        asperiores numquam ab cupiditate omnis in. Sunt dolorum consequuntur
        modi laboriosam nemo id exercitationem accusantium delectus a, voluptate
        officia iusto obcaecati ratione ex neque. Molestias optio voluptatum
        debitis doloribus totam pariatur aliquid, atque id sunt doloremque a.
        Facere aliquid non maiores ullam! Quae nulla ut, dicta minus,
        consequuntur accusamus, eius excepturi voluptatum quaerat totam odio
        aperiam fugiat! Distinctio et velit fugiat dicta sapiente placeat optio
        voluptates illo earum omnis dignissimos soluta voluptatum doloremque
        asperiores officiis ab magni necessitatibus aspernatur modi animi itaque
        unde tenetur, rem harum. Sequi tenetur vero temporibus, facere fugit
        soluta harum laborum veniam aspernatur, ipsam accusamus nemo ipsum non
        quidem repudiandae explicabo delectus enim id impedit eligendi adipisci
        magni ratione, pariatur nam! Quia magnam nemo vel asperiores, blanditiis
        ipsa voluptas. Tenetur at labore qui, iste pariatur aut ea in repellat
        similique accusamus ipsum magni minima fuga id alias maxime harum
        aperiam voluptatum eius inventore dolorem itaque, molestiae sed? Ipsa
        doloremque accusantium sed quia nobis incidunt fuga ullam neque dolor
        distinctio dolorem soluta dignissimos quisquam hic, ad commodi,
        veritatis cumque quibusdam voluptates magnam! Iste veritatis nam ratione
        repudiandae eum ex, harum vitae, culpa odio error adipisci. Molestiae ut
        ducimus dolorum, minus sapiente quaerat quae minima dolorem esse
        delectus nihil! Ipsum, recusandae repellat, natus architecto animi
        molestiae ullam, reprehenderit aperiam eaque quibusdam ratione molestias
        quaerat magnam pariatur quasi atque! Dolorum autem quo iure mollitia hic
        doloremque, iste voluptatibus adipisci accusamus nisi sunt esse quas
        architecto nam deserunt, nihil, illo rem libero officiis optio
        blanditiis magnam dolores. Deleniti iusto eaque, id perferendis
        inventore incidunt autem pariatur reiciendis fugit, suscipit voluptate
        impedit ducimus! Quam aperiam ab, quaerat vitae quia pariatur
        reprehenderit voluptatum assumenda enim, nemo omnis eligendi animi ullam
        ad. Qui recusandae unde, nulla doloremque cupiditate adipisci,
        aspernatur nesciunt quisquam ipsum culpa eius molestias minima magnam
        tenetur vitae repellendus sequi? Repellat magni rerum sint labore.
        Perferendis ipsum exercitationem quibusdam sint aut voluptatem sed
        blanditiis voluptatibus nisi, optio veniam eaque. Repellat iusto quo,
        sapiente accusantium dolorem amet nam, deserunt incidunt laudantium ad
        ea deleniti officiis consectetur delectus praesentium repudiandae quis
        assumenda ullam quisquam optio necessitatibus eum. Temporibus eligendi
        aliquid vel porro quibusdam exercitationem, deserunt cumque, enim minus
        at culpa magni ipsam doloribus a itaque voluptatum facere. Excepturi
        quam sapiente earum recusandae, ratione deleniti necessitatibus quod
        error ad corrupti, obcaecati odio officiis ipsam? Similique dolorem
        explicabo quis aperiam quam, iure aliquid! Cum consequatur, explicabo
        dolores reprehenderit nam perspiciatis omnis nesciunt similique labore
        officiis necessitatibus quisquam nobis error molestias blanditiis sint
        et exercitationem quis recusandae nihil cupiditate? Eligendi, atque.
        Adipisci veritatis necessitatibus, quod illo, enim iure officia culpa
        tempore ex nihil fuga? Architecto reprehenderit, ipsum ducimus, deserunt
        corporis dolore minima voluptas fugiat maxime consequuntur nemo magni
        eaque assumenda quidem ab cupiditate. Quos, impedit? Assumenda molestias
        eum quam voluptate sapiente. Officia nihil, similique excepturi a unde
        tempore fuga at, nemo corrupti eos, minus impedit! Magnam molestias
        temporibus a, laboriosam quisquam nisi voluptas facilis similique.
        Impedit nulla repellat quia aut officiis, nostrum libero unde eveniet
        provident doloremque deleniti nam asperiores dolorum tenetur hic,
        tempora non sapiente? Eligendi nulla quam facilis, aspernatur adipisci
        animi cum. Libero, repellat tenetur. Minus aliquid voluptates, cumque
        autem inventore reprehenderit accusantium totam blanditiis magni et
        reiciendis. Nam deserunt sunt consectetur laboriosam, assumenda commodi
        perferendis qui. Veritatis porro placeat nam consequuntur fugit
        repellendus, beatae quaerat neque ipsum molestias consectetur ullam.
        Doloribus rem beatae animi in saepe, quas cumque provident hic ducimus
        illo ipsam doloremque necessitatibus eaque repudiandae optio possimus
        aliquid minus architecto suscipit aspernatur incidunt ipsa nulla cum
        exercitationem? Tempora laborum accusantium incidunt corrupti dicta
        laboriosam, facere quasi assumenda hic? Repellendus nesciunt sunt
        asperiores. Ducimus harum error dolor nisi quod cumque, unde minima
        earum tempora deserunt quisquam laborum aliquid ullam laudantium,
        placeat soluta eveniet cum recusandae esse ea. Earum magni iusto facere
        doloremque ipsa ex, quia, saepe, enim incidunt error quibusdam tempore.
        Quibusdam blanditiis fuga, cumque incidunt provident placeat modi
        assumenda ratione facere unde ex ab distinctio illo sed consequuntur
        expedita? Doloribus perspiciatis sunt libero nostrum quae dolores
        provident, ipsa ut consectetur laudantium labore harum vel minima,
        soluta quas veritatis. Nulla explicabo totam ipsam, dolore amet ad porro
        facere minima voluptas voluptatum placeat cupiditate illo hic voluptates
        rem consectetur obcaecati ab repudiandae nesciunt esse nihil suscipit
        enim? Quas eos, rerum sequi id assumenda eveniet beatae impedit minima
        quidem nam quia, molestias cupiditate, doloremque veniam! Eveniet,
        repellat, laudantium, velit a nam possimus iste ipsam totam perferendis
        quam enim tempore nesciunt eius culpa praesentium magnam ullam eaque
        dolorem facilis id corrupti soluta autem inventore. Molestias eaque
        pariatur consequuntur doloremque dicta quasi accusamus est quisquam
        ipsam deleniti sequi reprehenderit nobis in voluptatibus, inventore
        excepturi aspernatur provident quibusdam, nihil soluta. Perferendis,
        perspiciatis in? Sed voluptate minima veniam adipisci, eius sit velit
        doloribus neque deserunt, quidem illum libero eaque quis vitae, sunt
        totam minus? A libero nobis tenetur, beatae adipisci ullam ipsam. Id
        excepturi ab minima exercitationem dolore deleniti dicta cumque tenetur
        totam? Suscipit eveniet iste deleniti fugit aperiam. Pariatur odit
        repellendus similique consequatur exercitationem magnam atque ullam eos
        dolores minima assumenda esse error fuga expedita quisquam sunt eius
        provident distinctio, vitae accusantium ipsa asperiores consectetur ab.
        Voluptate esse quidem sit repellendus ducimus. Et expedita, a commodi
        neque possimus ad doloremque nesciunt consectetur accusantium aperiam.
        Unde doloribus, dolorem molestiae assumenda voluptatem tempore. Esse
        saepe ipsum nostrum, quidem doloremque adipisci accusamus impedit! Eos
        voluptates ipsum voluptatem ducimus! Cumque, facilis aperiam saepe quae
        earum quam sequi voluptate sapiente doloribus at neque blanditiis
        suscipit molestias! Ad, in nulla? Vitae, quaerat fugiat repellendus
        totam ullam harum rem, iure porro repudiandae debitis temporibus, eum
        tempore non enim quia explicabo dolorem laudantium cupiditate aliquam
        reprehenderit? Quo accusantium aliquid neque, tempora consequuntur
        fugiat odit. Repellendus dolores asperiores assumenda tempora natus.
        Unde, exercitationem ratione culpa molestias ex libero iste magni!
        Necessitatibus, tenetur sunt ratione rerum aliquid tempora harum
        temporibus soluta sequi quisquam, rem quaerat quidem debitis hic cumque
        libero! Id deleniti maxime repellendus temporibus recusandae, magni,
        minus aut quo neque itaque excepturi reprehenderit optio, provident
        explicabo! Reiciendis voluptatum, laborum fugit in quos distinctio quasi
        possimus quidem rerum, aut explicabo cum. Veniam nisi sit officia
        adipisci mollitia, consequatur porro, quis, amet odio veritatis unde
        ducimus itaque odit? Totam quia dignissimos, rem autem deleniti numquam
        nostrum voluptates in ea consequatur adipisci similique delectus
        deserunt et necessitatibus ab laboriosam excepturi. Error vel est,
        aliquid, odio molestiae porro consectetur enim ipsum rerum tenetur
        corporis nobis. Qui, deserunt. Commodi nemo quia fuga quidem praesentium
        fugit minus, sit cupiditate harum quis culpa sunt. Unde, quam corrupti
        accusantium distinctio provident praesentium temporibus eos maxime
        labore ea vel nemo soluta reprehenderit rerum dicta, iusto ducimus
        assumenda dolorem aliquid atque expedita. Provident sed quia sapiente at
        vero voluptate sint molestiae in, quisquam tempore! Earum similique
        possimus debitis inventore, incidunt molestias facilis ipsa perferendis
        quod eum distinctio? Dolore officiis autem neque magnam velit totam,
        odit eos, rerum, tenetur quis aperiam libero quaerat reprehenderit iusto
        recusandae rem error labore sequi unde provident consequatur obcaecati
        voluptatem. Cum rerum similique temporibus sed in, nesciunt labore
        aliquid cumque ducimus praesentium necessitatibus fugit velit officiis
        neque quo tenetur deserunt! Totam porro modi debitis, incidunt explicabo
        doloremque recusandae dolorum est, veritatis officiis, aliquam amet
        minima nobis fugiat illo repellat! Necessitatibus blanditiis modi
        tempore ea culpa qui quia voluptatum rem quisquam consequatur nobis sed
        odit recusandae optio doloremque, dolore laudantium ducimus adipisci
        provident. Voluptatem reprehenderit iure, aliquid possimus recusandae
        debitis sed fuga quibusdam, tenetur molestias quaerat cumque. Sapiente
        sed velit, iure molestias, temporibus nobis in accusantium commodi
        voluptate consequatur officiis quod necessitatibus? Laudantium debitis
        eum quis magni corporis! Exercitationem, nulla aut distinctio
        praesentium excepturi necessitatibus doloremque eius quam? At molestiae
        porro, aliquid accusamus in illum dolor beatae quo voluptatem, natus
        ducimus reprehenderit saepe aut soluta. Culpa quidem molestias
        temporibus laboriosam perferendis incidunt unde magni veritatis! Vero
        error vel quo quam corrupti! Quibusdam repudiandae quidem deserunt
        exercitationem excepturi repellat! Perferendis a autem explicabo veniam.
        Voluptatibus iusto earum assumenda alias dolorum, excepturi, nisi
        necessitatibus sint corrupti minus sit, corporis officiis nostrum
        placeat labore explicabo incidunt ut eaque. Optio, autem laboriosam
        aliquam soluta, inventore facere consequatur aut quisquam qui
        accusantium ad unde facilis ipsum reprehenderit saepe ipsa ex beatae
        architecto sequi minima adipisci provident voluptate repudiandae
        quaerat! Illo consectetur animi necessitatibus veritatis dolores, eius
        possimus cupiditate fuga, eligendi nemo deleniti quasi, amet enim iste
        alias recusandae deserunt voluptas voluptatum omnis sequi ratione nulla
        accusantium fugiat. Voluptate dolore itaque explicabo possimus maxime
        odit, in quis deserunt iste quasi, asperiores nesciunt delectus illo
        natus! Sed quos voluptates incidunt rem non nam quam necessitatibus
        eveniet! Laudantium corrupti tenetur labore ea perferendis. Sint optio
        facilis ducimus corrupti molestias minima recusandae veniam eligendi
        quidem, saepe aliquam accusantium in pariatur rem est fuga ipsa
        expedita. Tempora temporibus voluptatem reiciendis, suscipit incidunt
        odit maiores nihil, veritatis labore at aliquid aliquam dolore
        voluptate, aperiam aut voluptates vitae. Expedita, eos error?
        Perferendis, harum illo? Deserunt adipisci cumque excepturi quis, et
        voluptate odit labore pariatur consectetur aliquid eligendi, quisquam in
        tempore libero similique assumenda! Architecto iusto molestias magni
        beatae. Culpa illum et commodi dolorem libero sed vero dolor ipsa sit
        repellat. Ducimus molestias laboriosam officia magnam dolorem eius in
        fugiat doloremque. Totam praesentium sapiente incidunt doloremque. Nihil
        aperiam laborum, enim vitae temporibus unde eligendi nobis rerum totam
        deserunt cum vel animi distinctio aut similique quo natus dicta sit ad
        amet, perspiciatis quia. Omnis dignissimos similique deserunt fugiat
        itaque suscipit magni illo quam deleniti consequuntur, quod praesentium.
        Non numquam necessitatibus, deserunt praesentium magnam repellat nulla
        molestias odio quasi labore natus dolorum perspiciatis adipisci neque
        earum perferendis sapiente. At consequuntur iste odit officiis quis
        blanditiis, minus totam illum consequatur commodi aperiam a inventore
        atque nemo necessitatibus quaerat id, temporibus facilis dolores ea
        laboriosam! Deserunt, nisi. Voluptates, provident hic ad accusamus
        maiores architecto sit eius modi tempore, vel, nemo earum! Molestias
        qui, deserunt harum perferendis odit alias saepe expedita illo earum
        blanditiis amet vel unde illum obcaecati ipsa sed dolore deleniti
        praesentium iusto nam? Saepe, dolor aspernatur, quis placeat libero
        dignissimos, animi non obcaecati fugiat beatae tempore deserunt modi
        optio rerum nisi sapiente! Facere, blanditiis sint. Hic maiores dolorem,
        nulla quam sed consectetur nemo nihil ad sint repellat impedit
        temporibus consequatur quibusdam sit fugit dignissimos in enim doloribus
        aspernatur praesentium optio minima dolore! Debitis deleniti alias error
        temporibus consectetur expedita delectus odio doloribus nesciunt, libero
        sequi fugiat sed ipsa esse tenetur architecto? Facere quam officiis esse
        provident nihil tempore dolores maxime omnis dignissimos. Ad cum rerum
        doloribus eos, odit commodi. Totam maiores ut ducimus debitis nesciunt
        doloribus nihil, aut tempora voluptate, quasi voluptatibus alias veniam
        sit voluptatum, voluptas perferendis saepe nostrum eligendi quas quos
        incidunt optio minus. Saepe incidunt autem animi dolorum quibusdam
        officiis vel explicabo? Laudantium culpa voluptas ratione aliquid veniam
        magni nostrum alias asperiores, quam nemo similique voluptatibus nulla
        in minima perferendis repellendus perspiciatis sunt sed nam eveniet aut
        vero voluptatum hic? Quaerat reprehenderit aperiam sit dolor, ab
        blanditiis est. Modi dolore blanditiis repellat eligendi necessitatibus,
        fuga beatae inventore exercitationem veniam, doloremque sed, minus
        temporibus impedit nulla. Officia, id. Voluptatum hic porro expedita
        blanditiis maiores minima repellat totam? Facilis iure repudiandae ex
        reiciendis totam perferendis dolore, mollitia nostrum enim temporibus
        nemo ipsum sequi ducimus eaque ratione, ullam sapiente soluta modi vitae
        pariatur? Fuga dicta nemo voluptate omnis animi quasi aperiam culpa
        natus quibusdam illum unde non ut rerum, magni molestias ea quam vel a,
        soluta quas? Quis officiis doloribus corporis tenetur commodi esse
        veniam aut, eveniet inventore beatae consectetur nihil ratione cum
        eligendi optio quisquam recusandae itaque vel distinctio alias. Sapiente
        cupiditate pariatur et dolore molestias, mollitia suscipit repudiandae
        assumenda soluta cum temporibus, at hic dolores. Eum, quo ex illum
        delectus amet aperiam cumque dicta corporis nihil sit itaque dolorum
        illo quibusdam maiores nam culpa accusamus laboriosam minus in voluptate
        ad quas. Saepe, voluptas quae illum sed, beatae a ad facilis est
        praesentium qui error amet tempora similique delectus aspernatur
        distinctio debitis! Ab, magni exercitationem eos, neque molestiae
        consectetur assumenda dolor quidem odio odit nulla tenetur recusandae?
        Impedit vero praesentium eum harum assumenda reiciendis dolorem quia
        fugit nemo repellendus, autem eligendi quas saepe inventore iusto ea
        quam, quasi totam alias, minus eaque at accusamus amet. Corrupti minima
        numquam earum qui! Nemo tenetur modi culpa voluptate eius, omnis vitae
        voluptatem, repellendus commodi optio libero, sapiente officia. Quaerat
        voluptate voluptatibus alias dolore nesciunt corrupti sed eveniet.
        Sequi, inventore ab praesentium nobis necessitatibus quidem libero, fuga
        asperiores earum delectus recusandae nemo dicta soluta nam corporis,
        laborum saepe dolore vitae porro blanditiis tenetur. Hic ipsa repellat,
        quibusdam quaerat sint optio maiores. Amet molestiae expedita deleniti
        veniam inventore neque libero necessitatibus ullam, unde ipsam ab nobis
        voluptas pariatur eveniet. Hic reprehenderit dolorum aliquid ex facilis.
        Porro, mollitia! Velit facere nobis autem nemo sit facilis officia fuga
        vitae earum molestias repellat id modi beatae maxime dignissimos numquam
        nihil sapiente tempora totam quis, est quae! Consectetur rerum ullam
        eaque autem porro quas recusandae dolorum nulla earum dolor nostrum qui
        ipsum, fugiat eos. Placeat ad sapiente non tempora natus accusantium!
        Quasi, eaque rem dolores, quibusdam dolorum corrupti consequatur libero
        veritatis reprehenderit, maxime ad quis ullam nesciunt officia minima
        fugiat porro laboriosam vitae adipisci? Facilis doloremque inventore
        expedita vero quam rerum aliquam dolor. Omnis mollitia commodi a
        perspiciatis sint nam minima illum voluptate sit laudantium quibusdam
        quia, optio iure quod error labore, aliquam repudiandae cum ipsa eaque
        quas porro molestiae sapiente. Non ullam voluptate consequuntur
        molestiae eaque, rem aut soluta repellendus minus pariatur? Esse, magnam
        obcaecati soluta sed quo dolorem sequi eum nulla aliquid nesciunt ad
        explicabo rerum repellat repellendus, quisquam hic. Quae ab aliquam
        incidunt dicta. Enim voluptas dolorem est facere inventore, officiis
        dolores reprehenderit autem blanditiis, qui consequuntur. Dicta ullam
        similique consectetur sequi minus iste molestias temporibus reiciendis
        aliquam quae sint, nulla, quasi ratione laudantium quibusdam fugiat
        doloribus hic illum nisi id quaerat rerum architecto et repellat! Saepe,
        quas! Quia eligendi quo ipsa facilis inventore maxime cupiditate unde
        velit. Est vel dolore eum voluptates expedita dignissimos
        necessitatibus, et repudiandae dolores quam laborum corporis nobis
        maiores sequi obcaecati. Numquam deleniti voluptatibus dignissimos
        temporibus voluptas iste doloribus explicabo enim praesentium modi qui
        nesciunt, perspiciatis rem illum inventore veritatis quam reiciendis.
        Illo, fugit voluptatum maiores veritatis assumenda reprehenderit
        sapiente molestias nisi nam quo itaque non aliquid quis sed hic at. Vel
        facere assumenda, ullam quaerat deleniti molestias eveniet, sunt
        reiciendis iusto earum recusandae officia consectetur laudantium quia,
        optio eligendi enim culpa excepturi voluptatem! Est quod culpa illo odit
        adipisci, nam voluptatum alias molestiae? Accusantium, asperiores, odit
        minima, quas earum minus animi magni odio quibusdam ipsa voluptas
        mollitia repellendus iste non unde fugiat itaque placeat nulla
        praesentium officiis. Corporis, fuga? Aliquid, eaque nobis.
      </div> */}
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

const SingleOpenCloseAccordion = () => {
  // const [singleOpenValue, setSingleOpenValue] = useState(null);

  // const handleSingleOpen = (value) => {
  //   if (singleOpenValue !== value) {
  //     setSingleOpenValue(value);
  //   } else {
  //     setSingleOpenValue(null);
  //   }
  // };

  // return (

  // one open at the time
  // <div className="bg-gray-200 p-3 rounded-lg">
  //   <h4 className="font-bold underline">one open at the time - Single Open Accordion</h4>
  //   <div>
  //     <div className="py-2">
  //       <div className="flex justify-between items-center">
  //         <button
  //           className="flex justify-between flex-1 pr-5 items-center"
  //           onClick={() => handleSingleOpen(101)}
  //         >
  //           <span>101.HelloQuestion</span>
  //           {/* <span>{singleOpenValue === 101 ? "-" : "+"}</span> */}
  //           <span>
  //             <svg
  //               className="fill-indigo-500 shrink-0"
  //               width="16"
  //               height="16"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <rect
  //                 y="7"
  //                 width="16"
  //                 height="2"
  //                 rx="1"
  //                 className={`transform origin-center transition duration-200 ease-out ${
  //                   singleOpenValue === 101 && "!rotate-180"
  //                 }`}
  //               />
  //               <rect
  //                 y="7"
  //                 width="16"
  //                 height="2"
  //                 rx="1"
  //                 className={`transform origin-center rotate-90 transition duration-200 ease-out ${
  //                   singleOpenValue === 101 && "!rotate-180"
  //                 }`}
  //               />
  //             </svg>
  //           </span>
  //         </button>
  //       </div>
  //       <div
  //         className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
  //           singleOpenValue === 101
  //             ? "grid-rows-[1fr] opacity-100"
  //             : "grid-rows-[0fr] opacity-0"
  //         }`}
  //       >
  //         <div className="overflow-hidden">Hello answer</div>
  //       </div>
  //     </div>
  //   </div>
  //   <div>
  //     <div className="py-2">
  //       <div className="flex justify-between items-center">
  //         <button
  //           className="flex justify-between flex-1 pr-5 items-center"
  //           onClick={() => handleSingleOpen(102)}
  //         >
  //           <span>102.kemchoQuestion</span>
  //           {/* <span>{singleOpenValue === 102 ? "-" : "+"}</span> */}
  //           <span>
  //             <svg
  //               className="fill-indigo-500 shrink-0"
  //               width="16"
  //               height="16"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <rect
  //                 y="7"
  //                 width="16"
  //                 height="2"
  //                 rx="1"
  //                 className={`transform origin-center transition duration-200 ease-out ${
  //                   singleOpenValue === 102 && "!rotate-180"
  //                 }`}
  //               />
  //               <rect
  //                 y="7"
  //                 width="16"
  //                 height="2"
  //                 rx="1"
  //                 className={`transform origin-center rotate-90 transition duration-200 ease-out ${
  //                   singleOpenValue === 102 && "!rotate-180"
  //                 }`}
  //               />
  //             </svg>
  //           </span>
  //         </button>
  //       </div>
  //       <div
  //         className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
  //           singleOpenValue === 102
  //             ? "grid-rows-[1fr] opacity-100"
  //             : "grid-rows-[0fr] opacity-0"
  //         }`}
  //       >
  //         <div className="overflow-hidden">kemcho answer</div>
  //       </div>
  //     </div>
  //   </div>
  //   <div>
  //     <div className="py-2">
  //       <div className="flex justify-between items-center">
  //         <button
  //           className="flex justify-between flex-1 pr-5 items-center"
  //           onClick={() => handleSingleOpen(103)}
  //         >
  //           <span>103.HowaeyouQuestion</span>
  //           {/* <span>{singleOpenValue === 103 ? "-" : "+"}</span> */}
  //           <span>
  //             <svg
  //               className="fill-indigo-500 shrink-0"
  //               width="16"
  //               height="16"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <rect
  //                 y="7"
  //                 width="16"
  //                 height="2"
  //                 rx="1"
  //                 className={`transform origin-center transition duration-200 ease-out ${
  //                   singleOpenValue === 103 && "!rotate-180"
  //                 }`}
  //               />
  //               <rect
  //                 y="7"
  //                 width="16"
  //                 height="2"
  //                 rx="1"
  //                 className={`transform origin-center rotate-90 transition duration-200 ease-out ${
  //                   singleOpenValue === 103 && "!rotate-180"
  //                 }`}
  //               />
  //             </svg>
  //           </span>
  //         </button>
  //       </div>
  //       <div
  //         className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
  //           singleOpenValue === 103
  //             ? "grid-rows-[1fr] opacity-100"
  //             : "grid-rows-[0fr] opacity-0"
  //         }`}
  //       >
  //         <div className="overflow-hidden">Howaeyou answer</div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // );

  const [isOpen101, setIsOpen101] = useState(false);
  const [isOpen102, setIsOpen102] = useState(false);
  const [isOpen103, setIsOpen103] = useState(false);

  return (
    // stay open once it clicked
    <div className="bg-gray-200 p-3 rounded-lg">
      <h4 className="font-bold underline">
        stay open once it clicked - Single Open Accordion
      </h4>
      <div>
        <div className="py-2">
          <div className="flex justify-between items-center">
            <button
              className="flex justify-between flex-1 pr-5 items-center"
              onClick={() => setIsOpen101(!isOpen101)}
            >
              <span>101.HelloQuestion</span>
              {/* <span>{singleOpenValue === 101 ? "-" : "+"}</span> */}
              <span>
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
                      isOpen101 && "!rotate-180"
                    }`}
                  />
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                      isOpen101 && "!rotate-180"
                    }`}
                  />
                </svg>
              </span>
            </button>
          </div>
          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
              isOpen101
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">Hello answer</div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-2">
          <div className="flex justify-between items-center">
            <button
              className="flex justify-between flex-1 pr-5 items-center"
              onClick={() => setIsOpen102(!isOpen102)}
            >
              <span>102.kemchoQuestion</span>
              {/* <span>{singleOpenValue === 102 ? "-" : "+"}</span> */}
              <span>
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
                      isOpen102 && "!rotate-180"
                    }`}
                  />
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                      isOpen102 && "!rotate-180"
                    }`}
                  />
                </svg>
              </span>
            </button>
          </div>
          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
              isOpen102
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">kemcho answer</div>
          </div>
        </div>
      </div>
      <div>
        <div className="py-2">
          <div className="flex justify-between items-center">
            <button
              className="flex justify-between flex-1 pr-5 items-center"
              onClick={() => setIsOpen103(!isOpen103)}
            >
              <span>103.HowaeyouQuestion</span>
              {/* <span>{singleOpenValue === 103 ? "-" : "+"}</span> */}
              <span>
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
                      isOpen103 && "!rotate-180"
                    }`}
                  />
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                      isOpen103 && "!rotate-180"
                    }`}
                  />
                </svg>
              </span>
            </button>
          </div>
          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 ${
              isOpen103
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">Howaeyou answer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionPagination;
