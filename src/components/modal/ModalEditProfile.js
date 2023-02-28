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
import {
  getCategoriesInventory,
  getItemInventory,
  getUserInfo,
  updateUser,
} from "@/services/user.service";
import { useAuthContext } from "@/context/auth-context";
import ImageLoading from "../loading/ImageLoading";
import Empty from "../empty/Empty";
import FormLoading from "@/components/loading/FormLoading";

const ModalEditProfile = () => {
  const { userInfo, setUserInfo, usernameAuth } = useAuthContext();
  const { username, avatar, cover, quote } = userInfo || {};

  const toast = useToast();
  const { openModal, payload } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 200;
  const [tab, setTab] = useState(payload);
  const [avatarUser, setAvatarUser] = useState(undefined);
  const [coverUser, setCoverUser] = useState(undefined);
  const [checkAvatar, setCheckAvatar] = useState(avatar);
  const [checkCover, setCheckCover] = useState(cover);
  const [itemInventory, setItemInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idCategory, setIdCategory] = useState("");
  const [statusData, setStatusData] = useState(STATUS.NOT_START);

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
      const formData = {
        avatar: avatarUser,
        cover: coverUser,
        quote: dataUser?.quote,
      };
      const res = await updateUser(formData);
      if (res) {
        const { data } = await getUserInfo(usernameAuth);
        setUserInfo({ ...userInfo, ...data });
      }
      notifySuccessMessage(toast, "Update successful");
      handleCloseModal();
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  const getTabInventory = async () => {
    const { data } = await getCategoriesInventory();
    setCategories(data?.item_categories);
  };

  const getItem = async (idCategory) => {
    try {
      const { data } = await getItemInventory(idCategory);
      if (!data) return;
      setItemInventory(data?.user_inventory?.rows);
      setStatusData(STATUS.SUCCESS);
    } catch (e) {
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    getTabInventory();
  }, []);

  useEffect(() => {
    if (categories) {
      setIdCategory(
        categories.filter((category) => category.name == payload)[0]?.id
      );
    }
  }, [categories]);

  useEffect(() => {
    if (!idCategory) return;
    getItem(idCategory);
  }, [idCategory]);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] flex-center backdrop-blur-sm">
      <div
        ref={modal_ref}
        className={`duration-${DURATION} transition-all opacity-5 scale-90 h-fit w-fit border-[5px] border-[#F472B6] rounded-[30px] flex flex-col bg-gradient-to-t from-[#740B99] to-[#2F0652] px-[30px] pb-[20px]`}
      >
        <div className="flex items-center justify-center mb-[30px]">
          <div className="bg-pink-800 rounded-[20px] mx-auto py-[5px] text-[32px] text-center font-bold w-[250px] shadow-md shadow-[#F761D6]">
            Edit Profile
          </div>
          <button onClick={handleCloseModal}>
            <IconClose />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <div className="flex flex-col justify-between items-center w-[204px]">
              <ImageLoading
                alt="avatar"
                src={checkAvatar}
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

            <div className="flex flex-col justify-between h-full w-fit min-w-fit self-start">
              <div className="flex">
                {categories?.map((category, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setTab(category?.name);
                      setIdCategory(category?.id);
                    }}
                    className={`${
                      category?.name == tab
                        ? "border-b-2 border-b-[#fff]"
                        : "opacity-[0.7]"
                    } text-center text-[28px] font-bold rounded-t-[20px] w-fit border-b-0 px-[5px] py-[2px] cursor-pointer mx-3`}
                  >
                    {category?.name}
                  </div>
                ))}
              </div>

              <div className="overflow-auto h-fit">
                {statusData === "SUCCESS" ? (
                  <>
                    {itemInventory?.length ? (
                      <div
                        className={`gap-4 overflow-auto max-h-[500px] pr-[20px] mt-[30px] grid grid-cols-1 justify-center min-[752px]:grid-cols-2 ${
                          tab == EDIT_PROFILE_TAB.AVATAR
                            ? "min-[990px]:grid-cols-3 min-[1248px]:grid-cols-4"
                            : ""
                        }`}
                      >
                        {itemInventory?.map((e, i) => (
                          <div
                            className="relative cursor-pointer"
                            key={i}
                            onClick={
                              tab == EDIT_PROFILE_TAB.AVATAR
                                ? () => {
                                    setAvatarUser(e?.item_info?.id),
                                      setCheckAvatar(e?.item_info?.url);
                                  }
                                : () => {
                                    setCoverUser(e?.item_info?.id),
                                      setCheckCover(e?.item_info?.url);
                                  }
                            }
                          >
                            <ImageLoading
                              alt=""
                              src={e?.item_info?.url}
                              className={`rounded-2xl h-[204px] object-cover max-[752px]:block max-[752px]:mx-auto ${
                                tab == EDIT_PROFILE_TAB.AVATAR
                                  ? "w-[204px]"
                                  : "w-auto"
                              }`}
                            ></ImageLoading>
                            {checkAvatar === e?.item_info?.url && (
                              <div className="rounded-2xl w-full h-full bg-[#00000080] absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                            )}
                            {checkCover === e?.item_info?.url && (
                              <div className="rounded-2xl w-full h-full bg-[#00000080] absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <Empty />
                    )}
                  </>
                ) : (
                  <div className="min-w-[500px]">
                    <FormLoading isLoading={true} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </BoxModal>
  );
};

export default ModalEditProfile;
