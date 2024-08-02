import { FC, useState } from "react";
import { FaFolder, FaFile } from "react-icons/fa";
import { AiFillFolderAdd } from "react-icons/ai";
import { AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

interface FileFolderItem {
  type: "folder" | "file";
  value: string;
  id: number;
  subFile?: FileFolderItem[];
  subFolder?: FileFolderItem[];
}

const FileFolder: FC = () => {
  const [rootInputValue, setRootInputValue] = useState<string>("");
  const [fileFolderStructureData, setFileFolderStructureData] = useState<
    FileFolderItem[]
  >([]);
  const [handleInputOpen, setHandleInputOpen] = useState<{
    type: "folder" | "file" | "";
    isOpen: boolean;
    division: "rootDirectory" | "main" | "sub" | "";
    indexOF?: number;
  }>({ type: "", isOpen: false, division: "" });

  console.log("fileFolderStructureData", fileFolderStructureData);

  const handleFolderClick = (id: number | null, subId?: number) => {
    if (rootInputValue.trim() === "") {
      alert("Please fill the input first to add folder");
      return;
    }

    const newFolder: FileFolderItem = {
      type: "folder",
      value: rootInputValue,
      id: Date.now(),
      subFile: [],
      subFolder: [],
    };

    if (id === null) {
      setFileFolderStructureData((prev) => [...prev, newFolder]);
    } else if (subId !== undefined) {
      const selectedFolderItem = fileFolderStructureData.find(
        (item) => item.id === id
      );
      const selectedSubFolderItem = selectedFolderItem?.subFolder?.find(
        (item) => item.id === subId
      );
      selectedSubFolderItem?.subFolder?.push(newFolder);
    } else {
      const selectedItem = fileFolderStructureData.find(
        (item) => item.id === id
      );
      selectedItem?.subFolder?.push(newFolder);
    }

    setRootInputValue("");
    setHandleInputOpen({ type: "", isOpen: false, division: "" });
  };

  const handleFileClick = (mainId: number | null, subId?: number) => {
    if (rootInputValue.trim() === "") {
      alert("Please fill the input first to add file");
    }

    const newFile: FileFolderItem = {
      type: "file",
      value: rootInputValue,
      id: Date.now(),
    };

    if (mainId === null) {
      setFileFolderStructureData((prev) => [...prev, newFile]);
    } else if (subId !== undefined) {
      const selectedMainFolderItem = fileFolderStructureData.find(
        (item) => item.id === mainId
      );
      const selectedSubFolderItem = selectedMainFolderItem?.subFolder?.find(
        (item) => item.id === subId
      );
      selectedSubFolderItem?.subFile?.push(newFile);
    } else {
      const selectedItem = fileFolderStructureData.find(
        (item) => item.id === mainId
      );
      selectedItem?.subFile?.push(newFile);
    }

    setRootInputValue("");
    setHandleInputOpen({ type: "", isOpen: false, division: "" });
  };

  return (
      <>
          <Link to="/chat" className="text-white bg-green-500 rounded-lg p-2 fixed bottom-10 right-10">
            Back to chat
          </Link>
      <div className="min-h-screen flex w-screen p-5 gap-10">
        <div className="w-1/4 border border-blue-500 p-4 flex flex-col gap-5">
          <div className="flex gap-4">
            <input
              type="text"
              className={`border border-blue-500 rounded-md duration-1000 transition-all ${
                handleInputOpen.type &&
                handleInputOpen.isOpen &&
                handleInputOpen.division === "rootDirectory"
                  ? "w-full opacity-1 visible p-2"
                  : "w-0 opacity-0 invisible p-0"
              }`}
              value={rootInputValue}
              onChange={(e) => setRootInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (handleInputOpen.type === "folder") {
                    handleFolderClick(null);
                  } else if (handleInputOpen.type === "file") {
                    handleFileClick(null);
                  }
                }
              }}
            />
            <button
              className="bg-green-500 rounded-md p-2"
              onClick={() => {
                setHandleInputOpen({
                  type: "folder",
                  isOpen: true,
                  division: "rootDirectory",
                });
              }}
            >
              <AiFillFolderAdd className="text-3xl" />
            </button>
            <button
              className="bg-blue-400 rounded-md p-2"
              onClick={() => {
                setHandleInputOpen({
                  type: "file",
                  isOpen: true,
                  division: "rootDirectory",
                });
              }}
            >
              <AiFillFileAdd className="text-3xl" />
            </button>
          </div>
          <div>
            <div>
              {fileFolderStructureData.map((data, index) => (
                <div key={data.id} className="flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {data.type === "folder" ? <FaFolder /> : <FaFile />}
                      {data.value}
                    </div>
                    {data.type === "folder" && (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          className={`border w-full border-blue-500 rounded-md duration-1000 transition-all ${
                            handleInputOpen.type &&
                            handleInputOpen.isOpen &&
                            handleInputOpen.division === "main" &&
                            handleInputOpen.indexOF === index
                              ? "opacity-1 visible p-1"
                              : "opacity-0 invisible p-0"
                          }`}
                          value={rootInputValue}
                          onChange={(e) => setRootInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              if (handleInputOpen.type === "folder") {
                                handleFolderClick(data.id);
                              } else if (handleInputOpen.type === "file") {
                                handleFileClick(data.id);
                              }
                            }
                          }}
                        />
                        <button
                          className="bg-green-500 rounded-md p-1"
                          onClick={() =>
                            setHandleInputOpen({
                              type: "folder",
                              isOpen: true,
                              division: "main",
                              indexOF: index,
                            })
                          }
                        >
                          <AiFillFolderAdd className="text-3xl" />
                        </button>
                        <button
                          className="bg-blue-400 rounded-md p-1"
                          onClick={() =>
                            setHandleInputOpen({
                              type: "file",
                              isOpen: true,
                              division: "main",
                              indexOF: index,
                            })
                          }
                        >
                          <AiFillFileAdd className="text-3xl" />
                        </button>
                      </div>
                    )}
                  </div>
                  {data?.subFolder?.map((subFolderItem, index) => (
                    <div className="flex flex-col" key={subFolderItem.id}>
                      <div className="pl-10 flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <FaFolder />
                          {subFolderItem?.value}
                        </div>
                        <div className="flex gap-2 justify-end">
                          <input
                            type="text"
                            className={`border border-blue-500 w-full rounded-md duration-1000 transition-all ${
                              handleInputOpen.type &&
                              handleInputOpen.isOpen &&
                              handleInputOpen.division === "sub" &&
                              handleInputOpen.indexOF === index
                                ? "opacity-1 visible p-1"
                                : "opacity-0 invisible p-0"
                            }`}
                            value={rootInputValue}
                            onChange={(e) => setRootInputValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                if (handleInputOpen.type === "folder") {
                                  handleFolderClick(data.id, subFolderItem.id);
                                } else if (handleInputOpen.type === "file") {
                                  handleFileClick(data.id, subFolderItem.id);
                                }
                              }
                            }}
                          />
                          <button
                            className="bg-green-500 rounded-md p-1"
                            onClick={
                              () =>
                                setHandleInputOpen({
                                  type: "folder",
                                  isOpen: true,
                                  division: "sub",
                                  indexOF: index,
                                })
                              // handleFolderClick(data.id)
                            }
                          >
                            <AiFillFolderAdd className="text-3xl" />
                          </button>
                          <button
                            className="bg-blue-400 rounded-md p-1"
                            onClick={() => {
                              setHandleInputOpen({
                                type: "file",
                                isOpen: true,
                                division: "sub",
                                indexOF: index,
                              });
                            }}
                          >
                            <AiFillFileAdd className="text-3xl" />
                          </button>
                        </div>
                      </div>

                      {subFolderItem?.subFolder?.map(
                        (semiSubFolderItem, index) => (
                          <div className="flex flex-col" key={subFolderItem.id}>
                            <div className="pl-20 flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <FaFolder />
                                {semiSubFolderItem?.value}
                              </div>
                              <div className="flex gap-2 justify-end">
                                <input
                                  type="text"
                                  className={`border border-blue-500 w-full rounded-md duration-1000 transition-all ${
                                    handleInputOpen.type &&
                                    handleInputOpen.isOpen &&
                                    handleInputOpen.division === "sub" &&
                                    handleInputOpen.indexOF === index
                                      ? "opacity-1 visible p-1"
                                      : "opacity-0 invisible p-0"
                                  }`}
                                  value={rootInputValue}
                                  onChange={(e) =>
                                    setRootInputValue(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      if (handleInputOpen.type === "folder") {
                                        handleFolderClick(
                                          data.id,
                                          subFolderItem.id
                                        );
                                      } else if (
                                        handleInputOpen.type === "file"
                                      ) {
                                        handleFileClick(
                                          data.id,
                                          subFolderItem.id
                                        );
                                      }
                                    }
                                  }}
                                />
                                <button
                                  className="bg-green-500 rounded-md p-1"
                                  onClick={
                                    () =>
                                      setHandleInputOpen({
                                        type: "folder",
                                        isOpen: true,
                                        division: "sub",
                                        indexOF: index,
                                      })
                                    // handleFolderClick(data.id)
                                  }
                                >
                                  <AiFillFolderAdd className="text-3xl" />
                                </button>
                                <button
                                  className="bg-blue-400 rounded-md p-1"
                                  onClick={() => {
                                    setHandleInputOpen({
                                      type: "file",
                                      isOpen: true,
                                      division: "sub",
                                      indexOF: index,
                                    });
                                  }}
                                >
                                  <AiFillFileAdd className="text-3xl" />
                                </button>
                              </div>
                            </div>
                            {/* {subFolderItem.subFile &&
                            subFolderItem.subFile.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-3 pl-20 mb-4"
                              >
                                <FaFile />
                                {item.value}
                              </div>
                            ))} */}
                          </div>
                        )
                      )}

                      {subFolderItem.subFile &&
                        subFolderItem.subFile.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 pl-20 mb-4"
                          >
                            <FaFile />
                            {item.value}
                          </div>
                        ))}
                    </div>
                  ))}
                  {data?.subFile &&
                    data?.subFile?.map((subFileItem) => (
                      <div className="pl-10 mb-4" key={subFileItem.id}>
                        <div className="flex items-center gap-3">
                          <FaFile />
                          {subFileItem?.value}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border border-red-600 flex-1 p-4">klnfnelkf</div>
      </div>
    </>
  );
};

export default FileFolder;
