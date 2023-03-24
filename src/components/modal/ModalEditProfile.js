/* eslint-disable indent */
import React, { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useModalContext } from "@/context/modal-context";
import { SHOP_TAB, MODAL_NAME, STATUS } from "@/utils/constant";
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
import TextareaHook from "../custom/TextareaHook";

import { useToast } from "@chakra-ui/react";
import { getUserInfo, updateUser } from "@/services/user.service";
import { useAuthContext } from "@/context/auth-context";
import ImageLoading from "../loading/ImageLoading";
import Empty from "../empty/Empty";
import ButtonLoading from "../loading/ButtonLoading";
import Link from "next/link";
import Pagination from "../pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";

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
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useEffect(() => {
    sleep(1).then(() => {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
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

  const displayItems = payload?.tab !== SHOP_TAB.COVER_PAGE ? 8 : 4;
  const { currentItems, handlePageClick } = usePagination(
    displayItems,
    payload?.item
  );

  return (
    <BoxModal className="fixed h-[100vh] w-full z-50 text-white bg-[#00000073] flex-center backdrop-blur-sm">
      <div
        ref={modal_ref}
        className={`duration-${DURATION} overflow-hidden transition-all opacity-5 scale-90 h-fit max-[990px]:h-[70vh] w-fit max-[700px]:w-[90%] max-[350px]:w-full border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-gradient-to-t from-[#740B99] to-[#2F0652] px-[30px] pb-[20px]`}
      >
        <div className="flex items-center justify-center mb-[30px]">
          <div className="bg-pink-800 rounded-[20px] mx-auto py-[5px] px-2 text-[32px] text-center font-bold w-fit shadow-md shadow-[#F761D6] max-[400px]:text-2xl">
            Edit
            {payload?.tab === SHOP_TAB.AVATAR ? " Profile" : " Cover Page"}
          </div>
          <button onClick={handleCloseModal}>
            <IconClose className="text-[#F472B6] w-5 h-5" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full w-full overflow-hidden"
        >
          <div className="flex max-[990px]:flex-col w-full h-full overflow-y-scroll modal-scroll">
            {payload?.tab === SHOP_TAB.AVATAR && (
              <div className="max-[990px]:w-full flex">
                <div className="flex flex-col justify-between items-center w-[204px] max-[990px]:w-full max-[990px]:pb-5 max-[990px]:border-b-[2px] max-[990px]:border-b-[#FDA3FF]">
                  <div className="max-[990px]:flex max-[600px]:justify-between max-[990px]:justify-evenly max-[990px]:w-full max-[550px]:flex-col max-[550px]:items-center">
                    <ImageLoading
                      alt="avatar"
                      src={checkAvatar || "/avatar-1.svg"}
                      className="rounded-[20px] h-[204px] w-[204px] object-cover"
                    />

                    <div>
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
                        maxLength="100"
                        name="quote"
                        id="quote"
                        control={control}
                        className="w-full h-[150px] rounded-[20px] p-2 px-3 box-border text-black edit-input bg-[95%_95%] focus-visible:outline-0 modal-scroll"
                        placeholder="User’s quote"
                      />
                    </div>
                  </div>

                  <button className="mt-[10px] w-[74px] h-[36px] btn-save-gradient">
                    Save
                  </button>
                </div>

                <Image
                  alt="line"
                  className="mx-[30px] max-[990px]:hidden"
                  src={lineImg}
                />
              </div>
            )}
            {verifyStatus === STATUS.SUCCESS ? (
              <div className="flex flex-col justify-between h-full w-fit min-w-fit max-[990px]:pt-5 max-[990px]:w-full">
                <div className="h-full">
                  {payload?.item?.length ? (
                    <div className="h-full flex flex-col">
                      <div
                        className={`gap-4 pr-4 max-h-[500px] grid grid-cols-2 justify-between max-[990px]:max-h-fit ${
                          payload?.tab === SHOP_TAB.AVATAR
                            ? "min-[500px]:grid-cols-3 min-[800px]:grid-cols-4 flex-wrap"
                            : "max-[550px]:grid-cols-1"
                        }`}
                      >
                        {currentItems?.map((e, i) => (
                          <div
                            className="relative cursor-pointer group"
                            key={i}
                            onClick={
                              payload?.tab === SHOP_TAB.AVATAR
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
                              className={`rounded-2xl h-[204px] object-cover max-[752px]:block max-[752px]:mx-auto max-[600px]:w-full 
                          ${
                            payload?.tab === SHOP_TAB.AVATAR
                              ? "w-[204px] max-[990px]:h-[150px] max-[600px]:h-[94px]"
                              : "w-[424px] max-[550px]:w-full max-[550px]:h-[204px]"
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
                      {/* <div className="absolute bottom-[-50px] left-[50%] translate-x-[-50%] translate-y-[0%]"> */}
                      <Pagination
                        onPageChange={handlePageClick}
                        itemsPerPage={displayItems}
                        items={payload?.item}
                      />
                      {/* </div> */}
                    </div>
                  ) : (
                    <div className="h-[300px]">
                      <div className="w-[500px] h-[200px] max-[990px]:mx-auto max-[350px]:w-full max-[700px]:w-[90%]">
                        <Empty />
                      </div>
                      <Link
                        href={"/shop"}
                        onClick={handleCloseModal}
                        className="w-fit self-center"
                      >
                        <button className="block text-[20px] font-semibold btn-save-gradient mx-auto px-5 py-2">
                          Go to shop
                        </button>
                      </Link>
                    </div>
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
