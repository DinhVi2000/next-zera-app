import React, { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { useModalContext } from "@/context/modal-context";
import { EDIT_PROFILE_TAB, MODAL_NAME } from "@/utils/constant";
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
import { updateUser } from "@/services/user.service";
import { useAuthContext } from "@/context/auth-context";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserFormSchema } from "@/validators/update-user.validator";
import ImageLoading from "../loading/ImageLoading";

const ModalEditProfile = () => {
  const { userInfo, setUserInfo } = useAuthContext();
  const { username, avatar, cover, quote } = userInfo || {};

  //FAKE DATA
  const arrImgUser = [
    "https://img.freepik.com/free-vector/cute-corgi-dog-sleeping-pillow-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3467.jpg?w=740&t=st=1676967206~exp=1676967806~hmac=f821bf81ed1fafb6c37cc96110c9c4de182fdd29fd45cb4edb124b2cc4a5f9c2",
    "https://img.freepik.com/free-vector/cute-shiba-inu-dog-stretching-cartoon-illustration_138676-2788.jpg?w=740&t=st=1676967223~exp=1676967823~hmac=c5089b1d2b1f733140f7de2c4bcaa940603617ba7da92ec5cdf55b20e147b9c2",
  ];

  const arrCoverUser = [
    "https://img.freepik.com/free-vector/candy-planet-cartoon-illustration-with-fantasy-alien-trees-sweets-magic-unusual-nature-landscape_107791-6361.jpg?w=1380&t=st=1676967272~exp=1676967872~hmac=754622612efa6c2b53860afec3cf065219a66d70f4e68e1da80a3b2b1831195f",
    "https://img.freepik.com/free-vector/game-ground-platform-with-spaceman-alien-planet_107791-14572.jpg?w=1380&t=st=1676967314~exp=1676967914~hmac=7460d92031e94e10bcd3fc241ee516b9b2277a27ec2f912b03faef88be6978c6",
  ];

  const toast = useToast();
  const { openModal, payload } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 200;
  const [tab, setTab] = useState(payload);
  const [avatarUser, setAvatarUser] = useState(avatar);
  const [coverUser, setCoverUser] = useState(cover);

  const handleCloseModal = () => {
    modal_ref.current.classList?.remove("animation-open-modal");
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  const tabs = [
    {
      title: "Avatar",
      tabName: EDIT_PROFILE_TAB.AVATAR,
    },
    {
      title: "Cover page",
      tabName: EDIT_PROFILE_TAB.COVER_PAGE,
    },
  ];

  const {
    handleSubmit,
    formState: { isValid },
    control,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(updateUserFormSchema),
    defaultValues: {
      username,
      quote,
    },
  });

  const onSubmit = async (dataUser) => {
    if (!isValid) return;
    try {
      const data = await updateUser({
        username: dataUser.username ? dataUser.username : username,
        avatar_id_active: avatarUser,
        cover_id_active: coverUser,
        quote: dataUser.quote ? dataUser.quote : quote,
      });
      if (!data) {
        throw new Error(data?.message);
      }
      setUserInfo(data);
      notifySuccessMessage(toast, "Update successful");
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
                src={avatarUser}
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
                {tabs?.map(({ title, tabName }, i) => (
                  <div
                    key={i}
                    onClick={() => setTab(tabName)}
                    className={`${
                      tabName === tab
                        ? "border-b-2 border-b-[#fff]"
                        : "opacity-[0.7]"
                    } text-center text-[28px] font-bold rounded-t-[20px] w-fit border-b-0 px-[5px] py-[2px] cursor-pointer mx-3`}
                  >
                    {title}
                  </div>
                ))}
              </div>
              <div className="overflow-auto h-fit">
                {tab == EDIT_PROFILE_TAB.AVATAR ? (
                  <div
                    className="mt-[30px] grid grid-cols-1 justify-center min-[752px]:grid-cols-2
                  min-[990px]:grid-cols-3 min-[1248px]:grid-cols-4 gap-4 overflow-auto max-h-[500px] pr-[20px]"
                  >
                    {arrImgUser.map((avaImg, i) => (
                      <div
                        className="relative cursor-pointer"
                        key={i}
                        onClick={() => setAvatarUser(avaImg)}
                      >
                        <ImageLoading
                          alt=""
                          src={avaImg}
                          className="rounded-2xl w-[204px] h-[204px] object-cover max-[752px]:block max-[752px]:mx-auto"
                        ></ImageLoading>
                        {avatarUser === avaImg && (
                          <div className="rounded-2xl w-full h-full bg-[#00000080] absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="mt-[30px] grid grid-cols-1 justify-center
                  min-[752px]:grid-cols-2 gap-4 overflow-auto max-h-[500px] pr-[20px]"
                  >
                    {arrCoverUser.map((coverImg, i) => (
                      <div
                        className="relative cursor-pointer"
                        key={i}
                        onClick={() => setCoverUser(coverImg)}
                      >
                        <ImageLoading
                          alt=""
                          src={coverImg}
                          className="rounded-2xl w-[424px] h-[204px] object-cover max-[752px]:block max-[752px]:mx-auto"
                        ></ImageLoading>
                        {coverUser === coverImg && (
                          <div className="rounded-2xl w-full h-full bg-[#00000080] absolute z-20 top-0 left-0 border-[4px] border-[#DB2777]"></div>
                        )}
                      </div>
                    ))}
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
