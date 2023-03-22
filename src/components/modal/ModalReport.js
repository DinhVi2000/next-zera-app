import React, { useEffect, useRef, useState } from "react";

import { useModalContext } from "@/context/modal-context";
import { MODAL_NAME, STATUS } from "@/utils/constant";
import {
  notifyErrorMessage,
  notifySuccessMessage,
  sleep,
} from "@/utils/helper";
import BoxModal from "./BoxModal";

import { IconClose } from "@/resources/icons";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { reportGame } from "@/services/game.service";
import CheckBoxHook from "../custom/CheckBoxHook";
import TextareaHook from "../custom/TextareaHook";
import { useToast } from "@chakra-ui/react";
import ButtonLoading from "../loading/ButtonLoading";

const ModalReport = () => {
  const [status, setStatus] = useState(STATUS.NOT_START);
  const [error, setError] = useState();
  const { openModal } = useModalContext();
  const modal_ref = useRef(null);
  const DURATION = 0;

  const toast = useToast();
  const { handleSubmit, control } = useForm();
  const { info } = useSelector(({ game: { gameDetail } }) => gameDetail) ?? {};

  const handleCloseModal = () => {
    sleep(DURATION).then(() => openModal(MODAL_NAME.NONE));
  };

  useOnClickOutside(modal_ref, handleCloseModal);

  useEffect(() => {
    sleep(1).then(() => {
      modal_ref.current.classList?.add("animation-open-modal");
    });
  }, []);

  const onSubmit = async (data) => {
    setStatus(STATUS.IN_PROGRESS);
    const title = Object?.keys(data)?.filter((key) => data[key] === true);
    const content = data?.content;

    if (title?.length === 0) {
      setError("*Please select at least one field");
      setStatus(STATUS.NOT_START);
      return;
    } else {
      setError("");
    }
    try {
      const { data } = await reportGame({ title, content }, info?.slug);
      if (!data?.error) {
        setStatus(STATUS.SUCCESS);
      }
    } catch (e) {
      setStatus(STATUS.NOT_START);
      notifyErrorMessage(toast, e);
    }
  };

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      handleCloseModal();
      notifySuccessMessage(toast, "You reported successful!");
    }
  }, [status]);

  return (
    <BoxModal className="fixed h-[100vh] w-full z-20 text-white bg-[#00000073] backdrop-blur-sm flex-center">
      <div
        ref={modal_ref}
        className="opacity-5 scale-90 w-[500px] h-fit border-[5px] border-[#9F9F9F] rounded-[30px] flex flex-col bg-[#515151] p-5 relative "
      >
        <div className="flex justify-between w-full mb-3">
          <h4 className="text-3xl font-bold">Report</h4>
          <IconClose onClick={handleCloseModal} className="w-5 h-5" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col ml-6 max-[420px]:ml-2"
        >
          <div className="mb-4">
            <CheckBoxHook
              className="mr-3"
              name="lag"
              control={control}
              id="lag"
            >
              <p className="text-base">Lag</p>
            </CheckBoxHook>
          </div>
          <div className="mb-4">
            <CheckBoxHook
              className="mr-3"
              name="sound-quality"
              control={control}
              id="sound-quality"
            >
              <p className="text-base">Sound Quality</p>
            </CheckBoxHook>
          </div>
          <div className="mb-4">
            <CheckBoxHook
              className="mr-3"
              name="functions"
              control={control}
              id="functions"
            >
              <p className="text-base">Functions</p>
            </CheckBoxHook>
          </div>
          <div className="mb-4">
            <CheckBoxHook
              className="mr-3"
              name="text"
              control={control}
              id="text"
            >
              <p className="text-base">Text</p>
            </CheckBoxHook>
          </div>
          <div className="mb-4">
            <CheckBoxHook
              className="mr-3"
              name="animations"
              control={control}
              id="animations"
            >
              <p className="text-base">Animations</p>
            </CheckBoxHook>
          </div>

          <div className="flex flex-col mb-3">
            <p>Else</p>
            <TextareaHook
              className="mr-3 p-3 rounded-xl w-full h-[80px] text-black placeholder:text-[#8B5CF6]"
              name="content"
              placeholder="Write something..."
              maxLength="100"
              id="content"
              control={control}
            />
          </div>
          <button
            className="bg-[#8B5CF6] px-9 py-2 rounded-[20px] self-center text-lg flex-center"
            type="submit"
            disabled={status !== STATUS.NOT_START}
          >
            {status !== STATUS.NOT_START && <ButtonLoading isLoading />}
            Send
          </button>
          {error && (
            <p className="text-pink-600 text-sm h-4 leading-6 text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </BoxModal>
  );
};

export default ModalReport;
