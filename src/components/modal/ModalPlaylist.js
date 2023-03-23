/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import {
  addGameToPlaylist,
  createPlaylist,
  deleteGamePlaylist,
  deletePlaylist,
  getAllGamePlaylist,
  getAllPlaylist,
} from "@/services/game.service";
import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME, STATUS } from "@/utils/constant";
import { notifyErrorMessage, sleep } from "@/utils/helper";
import BoxModal from "./BoxModal";

import { IconClose, IconPlusNoRounded, IconTrash } from "@/resources/icons";

import { Tooltip, useToast } from "@chakra-ui/react";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Empty from "../empty/Empty";
import InputHook from "../custom/InputHook";
import { useForm } from "react-hook-form";
import { createPlaylistFormSchema } from "@/validators/create-playlist";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

const ModalPlaylist = () => {
  const {
    resetField,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(createPlaylistFormSchema),
    defaultValues: {
      name: "",
    },
  });
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const toast = useToast();
  const { openModal } = useModalContext();

  const [openInput, setOpenInput] = useState(false);
  const [allPlaylist, setAllPlaylist] = useState([]);
  const [status, setStatus] = useState(STATUS.NOT_START);
  const [idSelected, setIdSelected] = useState();
  const [loading, setLoading] = useState(false);

  const modal_ref = useRef(null);
  const DURATION = 200;

  const handleCloseModal = () => {
    modal_ref?.current?.classList?.remove("animation-open-modal");
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useOnClickOutside(modal_ref, handleCloseModal);

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref?.current?.classList?.add("animation-open-modal");
    });
  }, []);

  const getPlaylist = async () => {
    try {
      setLoading(true);
      const data = await getAllPlaylist(info?.slug);
      setAllPlaylist(data);
      setLoading(false);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      getPlaylist();
    }
  }, [status]);

  useEffect(() => {
    if (!openInput) {
      resetField("name");
    }
  }, [openInput]);

  const handleCreatePlaylist = async (formData) => {
    setStatus(STATUS.IN_PROGRESS);
    try {
      const data = await createPlaylist(formData);
      if (data?.success) {
        setStatus(STATUS.SUCCESS);
        setOpenInput((value) => !value);
      }
    } catch (e) {
      setStatus(STATUS.NOT_START);
      notifyErrorMessage(toast, e);
    }
  };

  const handleDeletePlaylist = async (id) => {
    try {
      setStatus(STATUS.IN_PROGRESS);
      const data = await deletePlaylist(id);
      if (data?.success) {
        setStatus(STATUS.SUCCESS);
      }
    } catch (e) {
      setStatus(STATUS.NOT_START);
      notifyErrorMessage(toast, e);
    }
  };

  const handleAddPlaylist = async (e) => {
    try {
      setStatus(STATUS.IN_PROGRESS);
      const formData = {
        playlist_id: e?.id,
        game_detail_id: info?.id,
      };

      if (e?.is_added) {
        try {
          const res = await getAllGamePlaylist(e?.id);
          const playlistItem = res?.find((e) => e?.game_detail_id === info?.id);
          const data = await deleteGamePlaylist(playlistItem?.id);
          if (data.success) {
            setStatus(STATUS.SUCCESS);
          }
        } catch (e) {
          setStatus(STATUS.FAIL);
          notifyErrorMessage(toast, e);
        }
      } else {
        const data = await addGameToPlaylist(formData);

        if (data?.success) {
          setStatus(STATUS.SUCCESS);
        }
      }
    } catch (e) {
      setStatus(STATUS.NOT_START);
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    const input = document.getElementById("name");
    input.focus();
  }, [openInput]);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-[60] text-white bg-[#00000073] flex-center">
      <div
        ref={modal_ref}
        className={`relative duration-${DURATION} transition-all opacity-5 scale-90 h-[450px] w-[540px] border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-[#831843] p-[20px] max-[550px]:min-w-full`}
      >
        <IconClose
          className="absolute top-4 right-4 w-4 h-4"
          onClick={handleCloseModal}
        />

        <div className="flex items-center justify-between w-full mt-7">
          <div className="text-2xl font-bold">Playlist</div>

          <div
            className={`flex-center cursor-pointer`}
            onClick={() => setOpenInput((value) => !value)}
          >
            <IconPlusNoRounded className="w-5 h-5 mr-2" />
            New list
          </div>
        </div>

        <div className="">
          <form
            className="text-white mt-5"
            onSubmit={handleSubmit(handleCreatePlaylist)}
            autoComplete="off"
          >
            {errors?.name?.message && openInput && (
              <p className="text-[#f82a2a] text-base h-4 leading-6 mt-0.5 mb-2">
                {errors?.name?.message}
              </p>
            )}
            <div
              className={`float-right bg-[#4C1D95] mb-1 shadow-md shadow-[#00000040] rounded-[10px] text-base transition-all text-white w-full flex items-center justify-between ${
                openInput ? "h-[60px] p-2 pr-4" : "h-0"
              }`}
            >
              <InputHook
                placeholder="New list"
                name="name"
                id="name"
                control={control}
                type="text"
                className={`text-white rounded-[3px] border-[2px] border-[#A78BFA] bg-[#4C1D95] placeholder:px-2 placeholder:text-[#A78BFA] placeholder:font-semibold ${
                  openInput ? "w-full h-full p-0 px-3 py-1" : "hidden"
                }`}
              />

              <div
                className={`text-[#F472B6] font-bold cursor-pointer ${
                  openInput ? " flex-center" : "hidden"
                }`}
              >
                <button type="submit" disabled={status === STATUS.IN_PROGRESS}>
                  Create
                </button>
                <button disabled={status === STATUS.IN_PROGRESS}>
                  <IconClose
                    className="w-3 h-3 text-white ml-3"
                    onClick={() => setOpenInput((value) => !value)}
                  />
                </button>
              </div>
            </div>
          </form>

          {!loading ? (
            <>
              {allPlaylist?.length > 0 ? (
                <div
                  className={`pb-1 overflow-y-scroll overflow-x-hidden modal-scroll w-full ${
                    openInput ? "h-[270px]" : "h-[300px]"
                  }`}
                >
                  {allPlaylist?.map((e, i) => (
                    <div
                      key={i}
                      className="pl-3 mt-1 h-[60px] float-right bg-[#4C1D95] shadow-md shadow-[#00000040] rounded-[10px] text-base transition-all text-white w-full flex items-center justify-between "
                    >
                      {e?.name}
                      <div className="flex h-full">
                        <div className="flex-center p-3">
                          <Tooltip label="Add Playlist">
                            <div onClick={() => handleAddPlaylist(e)}>
                              <IconPlusNoRounded
                                className={`w-6 h-6 mr-3 cursor-pointer ${
                                  e?.is_added ? "text-[#30fa30]" : "text-white"
                                }
                          `}
                              />
                            </div>
                          </Tooltip>
                          {idSelected === e?.id ? (
                            <Tooltip label="Cancel">
                              <div onClick={() => setIdSelected("")}>
                                <IconClose className="w-3 h-3 text-white ml-2 cursor-pointer" />
                              </div>
                            </Tooltip>
                          ) : (
                            <Tooltip label="Delete Playlist">
                              <div onClick={() => setIdSelected(e?.id)}>
                                <IconTrash className="cursor-pointer w-5 h-5" />
                              </div>
                            </Tooltip>
                          )}
                        </div>
                        <Tooltip label="Delete Playlist">
                          <div
                            className={`bg-[#C00000] rounded-r-[10px] flex-center transition-all overflow-hidden cursor-pointer ${
                              idSelected === e?.id ? "w-[100px] p-2" : "w-0"
                            }`}
                            onClick={() => handleDeletePlaylist(e?.id)}
                          >
                            <IconTrash className="cursor-pointer mr-1 w-5 h-5" />
                            Delete
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty>playlist</Empty>
              )}
            </>
          ) : (
            <>
              <div className="skeleton-shine w-full h-[60px] opacity-60 my-2 rounded-[10px]"></div>
              <div className="skeleton-shine w-full h-[60px] opacity-40 my-2 rounded-[10px]"></div>
              <div className="skeleton-shine w-full h-[60px] opacity-20 my-2 rounded-[10px]"></div>
            </>
          )}
        </div>
      </div>
    </BoxModal>
  );
};

export default ModalPlaylist;
9;
