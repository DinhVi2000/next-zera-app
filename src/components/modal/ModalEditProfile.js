import React, { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useModalContext } from "@/context/modal-context";
import { EDIT_PROFILE_TAB, MODAL_NAME, STATUS } from "@/utils/constant";
import {
  notifyErrorMessage,
  notifySuccessMessage,
  sleep,
} from "@/utils/helper";
import BoxModal from "./BoxModal";

import { IconClose } from "@/resources/icons";
import lineImg from "../../../public/images/Line.png";
import Image from "next/image";

import InputHook from "../custom/InputHook";
import TextareaHook from "../custom/Textarea";

import { useToast } from "@chakra-ui/react";
import { getUserInfo, updateUser } from "@/services/user.service";
import { useAuthContext } from "@/context/auth-context";
import ImageLoading from "../loading/ImageLoading";
import Empty from "../empty/Empty";
import ButtonLoading from "../loading/ButtonLoading";

const ModalEditProfile = () => {
  const { userInfo, setUserInfo, usernameAuth, verifyStatus } =
    useAuthContext();
  const { username, avatar, cover, quote } = userInfo || {};

  const toast = useToast();
  const { openModal, payload } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 200;

  const [isLoading, setIsLoading] = useState(false);
  const [avatarUser, setAvatarUser] = useState(undefined);
  const [checkAvatar, setCheckAvatar] = useState(avatar);

  const handleCloseModal = () => {
    modal_ref.current.classList?.remove("animation-open-modal");
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      username,
      quote,
    },
  });

  const onSubmit = async (dataUser) => {
    try {
      setIsLoading(true);
      const formData = {
        avatar: avatarUser,
        quote: dataUser?.quote,
      };
      const res = await updateUser(formData);
      if (res) {
        const { data } = await getUserInfo(usernameAuth);
        setUserInfo({ ...userInfo, ...data });
        setIsLoading(false);
      }
      notifySuccessMessage(toast, "Update Successful");
      handleCloseModal();
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  const updateCover = async (idCover) => {
    try {
      setIsLoading(true);
      const formData = {
        cover: idCover,
      };
      const res = await updateUser(formData);
      if (res) {
        const { data } = await getUserInfo(usernameAuth);
        setUserInfo({ ...userInfo, ...data });
        setIsLoading(false);
      }
      notifySuccessMessage(toast, "Update Cover Successful");
      handleCloseModal();
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] flex-center backdrop-blur-sm">
      <div
        ref={modal_ref}
        className={`duration-${DURATION} transition-all opacity-5 scale-90 h-fit w-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-gradient-to-t from-[#740B99] to-[#2F0652] px-[30px] pb-[20px]`}
      >
        <div className="flex items-center justify-center mb-[30px]">
          <div className="bg-pink-800 rounded-[20px] mx-auto py-[5px] px-2 text-[32px] text-center font-bold w-fit shadow-md shadow-[#F761D6]">
            Edit
            {payload?.tab === EDIT_PROFILE_TAB.AVATAR
              ? " Profile"
              : " Cover Page"}
          </div>
          <button onClick={handleCloseModal}>
            <IconClose />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            {payload?.tab === EDIT_PROFILE_TAB.AVATAR && (
              <>
                <div className="flex flex-col justify-between items-center w-[204px]">
                  <ImageLoading
                    alt="avatar"
                    src={
                      checkAvatar ||
                      "https://img.freepik.com/premium-vector/cute-animal-design_24911-11520.jpg?w=740"
                    }
                    className="rounded-[20px] h-[204px] w-[204px] object-cover"
                  />
                  <InputHook
                    disabled
                    name="username"
                    id="username"
                    control={control}
                    type="text"
                    placeholder="User name"
                    className="w-full my-[10px] rounded-[20px] p-2 px-3 box-border text-black bg-[95%_50%] focus-visible:outline-0"
                  />

                  <TextareaHook
                    name="quote"
                    id="quote"
                    control={control}
                    className="w-full h-[150px] rounded-[20px] p-2 px-3 box-border text-black edit-input bg-[95%_95%] focus-visible:outline-0"
                    placeholder="User’s quote"
                  />
                  <button className="mt-[10px] w-[74px] h-[36px] btn-save-gradient">
                    Save
                  </button>
                </div>

                <Image alt="line" className="mx-[30px]" src={lineImg} />
              </>
            )}
            {verifyStatus === STATUS.SUCCESS ? (
              <div className="flex flex-col justify-between h-full w-fit min-w-fit self-start">
                <div className="overflow-auto h-fit">
                  {payload?.item?.length ? (
                    <div
                      className={`gap-4 overflow-auto max-h-[500px] grid grid-cols-1 justify-center min-[752px]:grid-cols-2 ${
                        payload?.tab == EDIT_PROFILE_TAB.AVATAR
                          ? "min-[990px]:grid-cols-3 min-[1248px]:grid-cols-4"
                          : ""
                      }`}
                    >
                      {payload?.item?.map((e, i) => (
                        <div
                          className="relative cursor-pointer group"
                          key={i}
                          onClick={
                            payload?.tab == EDIT_PROFILE_TAB.AVATAR
                              ? () => {
                                  setAvatarUser(e?.item_info?.id),
                                    setCheckAvatar(e?.item_info?.url);
                                }
                              : () => {
                                  updateCover(e?.item_info?.id);
                                }
                          }
                        >
                          <ImageLoading
                            alt=""
                            src={e?.item_info?.url}
                            className={`rounded-2xl h-[204px] object-cover max-[752px]:block max-[752px]:mx-auto  
                          ${
                            payload?.tab == EDIT_PROFILE_TAB.AVATAR
                              ? "w-[204px]"
                              : "w-auto"
                          }`}
                          ></ImageLoading>
                          <div className="hidden group-hover:block rounded-2xl w-full h-full absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                          {checkAvatar === e?.item_info?.url && (
                            <div className="rounded-2xl w-full h-full bg-[#00000080] absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                          )}
                          {cover === e?.item_info?.url && (
                            <div className="rounded-2xl w-full h-full bg-[#00000080] absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Empty />
                  )}
                </div>
                {isLoading && (
                  <div className="rounded-[30px] absolute-center z-30 bg-[#00000080] w-full h-full flex-center">
                    <ButtonLoading isLoading={true} />
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-[30px] absolute-center z-30 bg-[#00000080] w-full h-full flex-center">
                <ButtonLoading isLoading={true} />
              </div>
            )}
          </div>
        </form>
      </div>
    </BoxModal>
  );
};

export default ModalEditProfile;
