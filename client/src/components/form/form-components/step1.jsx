import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "@/components/ui/styled-button";
import { StyledInput } from "@/components/ui/styled-input";
import { mutateCourseUrl } from "@/store/form-slice";
import { useStepContext } from "@/context/stepcontext";
import { setCourseAnalysisData } from "@/store/course-analysis-slice";
import * as FormUtils from "@/utils/form-utils";
import axios from "axios";
import { useLoadingContext } from "@/context/loadingcontext";
import { StyledModal } from "@/components/ui/modal";

export const Step1 = () => {
  const { nextStep } = useStepContext();
  const store_url = useSelector((state) => state.form.course_url);

  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [urlInputErrorMsg, setUrlInputErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [modalType, setModalType] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const { setToLoad, setLoaded } = useLoadingContext();

  const dispatch = useDispatch();

  useEffect(() => {
    if (store_url) {
      setUrl(store_url);
    }
  }, []);

  const isValidSocUrl = (str) => {
    // is valid soc app and has query params
    const regex =
      /^(https:\/\/)?sa\.ucla\.edu\/ro\/Public\/SOC\/Results\/ClassDetail\?.+/;
    return regex.test(str);
  };


  const handleSubmit = async () => {

    // first, check if the url is valid SOC URL. If not, error message.
    if (!isValidSocUrl(url)) {
      setUrlInputErrorMsg("This isn't a valid enrollment URL. Eg. ....");
      setIsUrlValid(false);
      return;
    }


    const requiredParams = FormUtils.requiredURLParams;

    // second, check if the url has all the necessary params. Error check.
    // third, check if the term_cd is in list of valid terms. Error check.

    let urlObject = new URL(url);

    let searchParams = new URLSearchParams(urlObject.search);

    for (let [key, value] of searchParams.entries()) {
      if (!requiredParams.includes(key)) {
        console.log("Invalid param");
      }

      if (key === "term_cd" && !FormUtils.validTerms.includes(value)) {
        console.log("invalid term");
      }
    }

    if (searchParams.size !== 5) {
      console.log("Invalid URL, too many query params");
    }

    dispatch(
      mutateCourseUrl({
        course_url: url,
      }),
    );

    setToLoad();

    const encoded_uri = encodeURIComponent(url);

    const response = await axios.get(
      `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/url?url=${encoded_uri}`,
    );
    dispatch(setCourseAnalysisData(response.data));

    setLoaded();
    setModalOpen(true);
    // nextStep();
  };

  return (
    <>
      <StyledModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
        body={modalBody}
        type={modalType}
      />
      <div className="flex flex-col gap-8 w-full">
        <StyledInput
          label="Enter course URL"
          placeholder="https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail..."
          inputState={url}
          setInputState={setUrl}
          isInvalid={!isUrlValid}
          errorMessage={urlInputErrorMsg}
          isClearable={true}
          classes="w-4/5 mx-auto"
        />
        <div>
          <StyledButton
            onPress={() => {}}
            isButtonDisabled={true}
            text="Previous"
            classes="w-1/2 flex-1"
          />
          <StyledButton
            onPress={handleSubmit}
            isButtonDisabled={false}
            text="Next"
            classes="w-1/2 flex-1"
          />
        </div>
      </div>
    </>
  );
};
