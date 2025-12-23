import { useEffect } from "react";
import Toast from "react-native-toast-message";
import { useSelector, shallowEqual } from "react-redux";

const SuccessOverlay = () => {
  // Helper function to check if message contains HTML tags
  const containsHTML = (message) => {
    if (typeof message !== "string") return false;
    return /<[a-z][\s\S]*>/i.test(message);
  };

  // Helper function to strip HTML tags and decode HTML entities
  const stripHTML = (html) => {
    if (typeof html !== "string") return html;
    // Remove HTML tags
    let text = html.replace(/<[^>]*>/g, "");
    // Decode common HTML entities
    text = text
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    return text.trim();
  };

  const { message: authMessage, error: authError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!authError && authMessage) {
      const messageText = containsHTML(authMessage)
        ? stripHTML(authMessage)
        : authMessage;

      Toast.show({
        type: "info",
        text1: "اطلاعیه",
        text2: messageText,
        position: "top",
        visibilityTime: 20000,
        autoHide: true,
      });
    }
  }, [authMessage, authError]);

  const showSuccessToast = (message) => {
    Toast.show({
      type: "success",
      text1: "موفقیت",
      text2: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  /////////////////////////////////////////////////// ok
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ////////////////////ticket/////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  const { errorStatesCreateTicketTypePost, messagesCreateTicketTypePost } =
    useSelector(
      (state) => ({
        errorStatesCreateTicketTypePost:
          state.superUser?.errorStates?.CREATE_TICKET?.POST,
        messagesCreateTicketTypePost:
          state.superUser?.messages?.CREATE_TICKET?.POST,
      }),
      shallowEqual
    );

  useEffect(() => {
    if (!errorStatesCreateTicketTypePost && messagesCreateTicketTypePost) {
      showSuccessToast(messagesCreateTicketTypePost);
    }
  }, [errorStatesCreateTicketTypePost, messagesCreateTicketTypePost]);

  /////////////////////////////////////////////////// ok
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ////////////////////profile////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  const {
    errorStatesProfilePatch,
    messagesProfilePatch,
    errorStatesUserMadeCoursesDelete,
    messagesUserMadeCoursesDelete,
  } = useSelector(
    (state) => ({
      errorStatesProfilePatch: state.superUser?.errorStates?.PROFILE?.PATCH,
      messagesProfilePatch: state.superUser?.messages?.PROFILE?.PATCH,
      errorStatesUserMadeCoursesDelete:
        state.superUser?.errorStates?.SELF_MADE_COURSES?.DELETE,
      messagesUserMadeCoursesDelete:
        state.superUser?.messages?.SELF_MADE_COURSES?.DELETE,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!errorStatesProfilePatch && messagesProfilePatch) {
      showSuccessToast(messagesProfilePatch);
    }
  }, [errorStatesProfilePatch, messagesProfilePatch]);

  useEffect(() => {
    if (!errorStatesUserMadeCoursesDelete && messagesUserMadeCoursesDelete) {
      showSuccessToast(messagesUserMadeCoursesDelete);
    }
  }, [errorStatesUserMadeCoursesDelete, messagesUserMadeCoursesDelete]);

  /////////////////////////////////////////////////// ok
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ////////////////////CreateCourse///////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  const {
    errorStatesCreateCoursePost,
    messagesCreateCoursePost,
    errorStatesCreateCoursePatch,
    messagesCreateCoursePatch,
  } = useSelector(
    (state) => ({
      errorStatesCreateCoursePost:
        state.superUser?.errorStates?.SELF_MADE_COURSES?.POST,
      messagesCreateCoursePost: state.superUser?.messages?.SELF_MADE_COURSES?.POST,
      errorStatesCreateCoursePatch:
        state.superUser?.errorStates?.SELF_MADE_COURSES?.PATCH,
      messagesCreateCoursePatch:
        state.superUser?.messages?.SELF_MADE_COURSES?.PATCH,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!errorStatesCreateCoursePost && messagesCreateCoursePost) {
      showSuccessToast(messagesCreateCoursePost);
    }
  }, [errorStatesCreateCoursePost, messagesCreateCoursePost]);

  useEffect(() => {
    if (!errorStatesCreateCoursePatch && messagesCreateCoursePatch) {
      showSuccessToast(messagesCreateCoursePatch);
    }
  }, [errorStatesCreateCoursePatch, messagesCreateCoursePatch]);

  ///////////////////////////////////////////////////ok
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ////////////////////Settings///////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  const { errorStatesSettingsPatch, messagesSettingsPatch } = useSelector(
    (state) => ({
      errorStatesSettingsPatch: state.superUser?.errorStates?.SETTINGS?.PATCH,
      messagesSettingsPatch: state.superUser?.messages?.SETTINGS?.PATCH,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!errorStatesSettingsPatch && messagesSettingsPatch) {
      showSuccessToast(messagesSettingsPatch);
    }
  }, [errorStatesSettingsPatch, messagesSettingsPatch]);

  /////////////////////////////////////////////////// ok
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ////////////////////Enrolled courses///////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  const { errorStatesEnrolledCourseGet, messagesEnrolledCourseGet } =
    useSelector(
      (state) => ({
        errorStatesEnrolledCourseGet:
          state.superUser?.errorStates?.ENROLLED_COURSE?.GET,
        messagesEnrolledCourseGet: state.superUser?.messages?.ENROLLED_COURSE?.GET,
      }),
      shallowEqual
    );
  useEffect(() => {
    if (!errorStatesEnrolledCourseGet && messagesEnrolledCourseGet) {
      showSuccessToast(messagesEnrolledCourseGet);
    }
  }, [errorStatesEnrolledCourseGet, messagesEnrolledCourseGet]);

  ///////////////////////////////////////////////////  ok
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ////////////////////Flowing courses////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  const { errorStatesFlowingCourseDelete, messagesFlowingCourseDelete } =
    useSelector(
      (state) => ({
        errorStatesFlowingCourseDelete:
          state.superUser?.errorStates?.FLOWING_COURSE?.DELETE,
        messagesFlowingCourseDelete:
          state.superUser?.messages?.FLOWING_COURSE?.DELETE,
      }),
      shallowEqual
    );
  useEffect(() => {
    if (!errorStatesFlowingCourseDelete && messagesFlowingCourseDelete) {
      showSuccessToast(messagesFlowingCourseDelete);
    }
  }, [errorStatesFlowingCourseDelete, messagesFlowingCourseDelete]);

  ///////////////////////////////////////////////////  ok
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ////////////////////Leitner////////////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  const {
    errorStatesLeitnerSettingsPatch,
    messagesLeitnerSettingsPatch,
    errorStatesLeitnerWordListsPost,
    messagesLeitnerWordListsPost,
    errorStatesLeitnerWordListsPatch,
    messagesLeitnerWordListsPatch,
    errorStatesLeitnerWordListsDelete,
    messagesLeitnerWordListsDelete,
    errorStatesLeitnerWordsPost,
    messagesLeitnerWordsPost,
    errorStatesLeitnerWordsPatch,
    messagesLeitnerWordsPatch,
    errorStatesLeitnerWordsDelete,
    messagesLeitnerWordsDelete,
  } = useSelector(
    (state) => ({
      errorStatesLeitnerSettingsPatch:
        state.superUser?.errorStates?.LEITNER_SETTINGS?.PATCH,
      messagesLeitnerSettingsPatch:
        state.superUser?.messages?.LEITNER_SETTINGS?.PATCH,

      errorStatesLeitnerWordListsPost:
        state.superUser?.errorStates?.WORD_LISTS?.POST,
      messagesLeitnerWordListsPost: state.superUser?.messages?.WORD_LISTS?.POST,
      errorStatesLeitnerWordListsPatch:
        state.superUser?.errorStates?.WORD_LISTS?.PATCH,
      messagesLeitnerWordListsPatch: state.superUser?.messages?.WORD_LISTS?.PATCH,
      errorStatesLeitnerWordListsDelete:
        state.superUser?.errorStates?.WORD_LISTS?.DELETE,
      messagesLeitnerWordListsDelete:
        state.superUser?.messages?.WORD_LISTS?.DELETE,

      errorStatesLeitnerWordsPost:
        state.superUser?.errorStates?.LEITNER_WORDS?.POST,
      messagesLeitnerWordsPost: state.superUser?.messages?.LEITNER_WORDS?.POST,
      errorStatesLeitnerWordsPatch:
        state.superUser?.errorStates?.LEITNER_WORDS?.PATCH,
      messagesLeitnerWordsPatch: state.superUser?.messages?.LEITNER_WORDS?.PATCH,
      errorStatesLeitnerWordsDelete:
        state.superUser?.errorStates?.LEITNER_WORDS?.DELETE,
      messagesLeitnerWordsDelete: state.superUser?.messages?.LEITNER_WORDS?.DELETE,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!errorStatesLeitnerSettingsPatch && messagesLeitnerSettingsPatch) {
      showSuccessToast(messagesLeitnerSettingsPatch);
    }
  }, [errorStatesLeitnerSettingsPatch, messagesLeitnerSettingsPatch]);
  useEffect(() => {
    if (!errorStatesLeitnerWordListsPost && messagesLeitnerWordListsPost) {
      showSuccessToast(messagesLeitnerWordListsPost);
    }
  }, [errorStatesLeitnerWordListsPost, messagesLeitnerWordListsPost]);
  useEffect(() => {
    if (!errorStatesLeitnerWordListsPatch && messagesLeitnerWordListsPatch) {
      showSuccessToast(messagesLeitnerWordListsPatch);
    }
  }, [errorStatesLeitnerWordListsPatch, messagesLeitnerWordListsPatch]);
  useEffect(() => {
    if (!errorStatesLeitnerWordListsDelete && messagesLeitnerWordListsDelete) {
      showSuccessToast(messagesLeitnerWordListsDelete);
    }
  }, [errorStatesLeitnerWordListsDelete, messagesLeitnerWordListsDelete]);
  useEffect(() => {
    if (!errorStatesLeitnerWordsPost && messagesLeitnerWordsPost) {
      showSuccessToast(messagesLeitnerWordsPost);
    }
  }, [errorStatesLeitnerWordsPost, messagesLeitnerWordsPost]);
  useEffect(() => {
    if (!errorStatesLeitnerWordsPatch && messagesLeitnerWordsPatch) {
      showSuccessToast(messagesLeitnerWordsPatch);
    }
  }, [errorStatesLeitnerWordsPatch, messagesLeitnerWordsPatch]);
  useEffect(() => {
    if (!errorStatesLeitnerWordsDelete && messagesLeitnerWordsDelete) {
      showSuccessToast(messagesLeitnerWordsDelete);
    }
  }, [errorStatesLeitnerWordsDelete, messagesLeitnerWordsDelete]);

  ///////////////////////////////////////////////////  ok
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  ////////////////////Knowledge Base////////////////
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  const {
    errorStatesKnowledgeBasePost,
    messagesKnowledgeBasePost,
    errorStatesKnowledgeBasePatch,
    messagesKnowledgeBasePatch,
    errorStatesKnowledgeBaseDelete,
    messagesKnowledgeBaseDelete,
    errorStatesKnowledgeBaseChaptersPost,
    messagesKnowledgeBaseChaptersPost,
    errorStatesKnowledgeBaseChaptersPatch,
    messagesKnowledgeBaseChaptersPatch,
    errorStatesKnowledgeBaseChaptersDelete,
    messagesKnowledgeBaseChaptersDelete,
    errorStatesKnowledgeBaseLessonsPost,
    messagesKnowledgeBaseLessonsPost,
    errorStatesKnowledgeBaseLessonsPatch,
    messagesKnowledgeBaseLessonsPatch,
    errorStatesKnowledgeBaseLessonsDelete,
    messagesKnowledgeBaseLessonsDelete,
    errorStatesKnowledgeBaseTutorialsPost,
    messagesKnowledgeBaseTutorialsPost,
    errorStatesKnowledgeBaseTutorialsPatch,
    messagesKnowledgeBaseTutorialsPatch,
    errorStatesKnowledgeBaseTutorialsDelete,
    messagesKnowledgeBaseTutorialsDelete,
    errorStatesKnowledgeBaseExamsPost,
    messagesKnowledgeBaseExamsPost,
    errorStatesKnowledgeBaseExamsPatch,
    messagesKnowledgeBaseExamsPatch,
    errorStatesKnowledgeBaseExamsDelete,
    messagesKnowledgeBaseExamsDelete,
    errorStatesKnowledgeBaseTutorialGeneratorPost,
    messagesKnowledgeBaseTutorialGeneratorPost,
    errorStatesKnowledgeBaseExamGeneratorPost,
    messagesKnowledgeBaseExamGeneratorPost,
    errorStatesKnowledgeBaseAiAssistantPatch,
    messagesKnowledgeBaseAiAssistantPatch,
  } = useSelector(
    (state) => ({
      errorStatesKnowledgeBasePost:
        state.superUser?.errorStates?.KNOWLEDGE_BASE?.POST,
      messagesKnowledgeBasePost: state.superUser?.messages?.KNOWLEDGE_BASE?.POST,
      errorStatesKnowledgeBasePatch:
        state.superUser?.errorStates?.KNOWLEDGE_BASE?.PATCH,
      messagesKnowledgeBasePatch: state.superUser?.messages?.KNOWLEDGE_BASE?.PATCH,
      errorStatesKnowledgeBaseDelete:
        state.superUser?.errorStates?.KNOWLEDGE_BASE?.DELETE,
      messagesKnowledgeBaseDelete:
        state.superUser?.messages?.KNOWLEDGE_BASE?.DELETE,

      errorStatesKnowledgeBaseChaptersPost:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_CHAPTERS?.POST,
      messagesKnowledgeBaseChaptersPost:
        state.superUser?.messages?.KNOWLEDGE_BASE_CHAPTERS?.POST,
      errorStatesKnowledgeBaseChaptersPatch:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_CHAPTERS?.PATCH,
      messagesKnowledgeBaseChaptersPatch:
        state.superUser?.messages?.KNOWLEDGE_BASE_CHAPTERS?.PATCH,
      errorStatesKnowledgeBaseChaptersDelete:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_CHAPTERS?.DELETE,
      messagesKnowledgeBaseChaptersDelete:
        state.superUser?.messages?.KNOWLEDGE_BASE_CHAPTERS?.DELETE,

      errorStatesKnowledgeBaseLessonsPost:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_LESSONS?.POST,
      messagesKnowledgeBaseLessonsPost:
        state.superUser?.messages?.KNOWLEDGE_BASE_LESSONS?.POST,
      errorStatesKnowledgeBaseLessonsPatch:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_LESSONS?.PATCH,
      messagesKnowledgeBaseLessonsPatch:
        state.superUser?.messages?.KNOWLEDGE_BASE_LESSONS?.PATCH,
      errorStatesKnowledgeBaseLessonsDelete:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_LESSONS?.DELETE,
      messagesKnowledgeBaseLessonsDelete:
        state.superUser?.messages?.KNOWLEDGE_BASE_LESSONS?.DELETE,

      errorStatesKnowledgeBaseTutorialsPost:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_TUTORIALS?.POST,
      messagesKnowledgeBaseTutorialsPost:
        state.superUser?.messages?.KNOWLEDGE_BASE_TUTORIALS?.POST,
      errorStatesKnowledgeBaseTutorialsPatch:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_TUTORIALS?.PATCH,
      messagesKnowledgeBaseTutorialsPatch:
        state.superUser?.messages?.KNOWLEDGE_BASE_TUTORIALS?.PATCH,
      errorStatesKnowledgeBaseTutorialsDelete:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_TUTORIALS?.DELETE,
      messagesKnowledgeBaseTutorialsDelete:
        state.superUser?.messages?.KNOWLEDGE_BASE_TUTORIALS?.DELETE,

      errorStatesKnowledgeBaseExamsPost:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_EXAMS?.POST,
      messagesKnowledgeBaseExamsPost:
        state.superUser?.messages?.KNOWLEDGE_BASE_EXAMS?.POST,
      errorStatesKnowledgeBaseExamsPatch:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_EXAMS?.PATCH,
      messagesKnowledgeBaseExamsPatch:
        state.superUser?.messages?.KNOWLEDGE_BASE_EXAMS?.PATCH,
      errorStatesKnowledgeBaseExamsDelete:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_EXAMS?.DELETE,
      messagesKnowledgeBaseExamsDelete:
        state.superUser?.messages?.KNOWLEDGE_BASE_EXAMS?.DELETE,

      errorStatesKnowledgeBaseTutorialGeneratorPost:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_TUTORIAL_GENERATOR?.POST,
      messagesKnowledgeBaseTutorialGeneratorPost:
        state.superUser?.messages?.KNOWLEDGE_BASE_TUTORIAL_GENERATOR?.POST,

      errorStatesKnowledgeBaseExamGeneratorPost:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_EXAM_GENERATOR?.POST,
      messagesKnowledgeBaseExamGeneratorPost:
        state.superUser?.messages?.KNOWLEDGE_BASE_EXAM_GENERATOR?.POST,

      errorStatesKnowledgeBaseAiAssistantPatch:
        state.superUser?.errorStates?.KNOWLEDGE_BASE_AI_ASSISTANT?.PATCH,
      messagesKnowledgeBaseAiAssistantPatch:
        state.superUser?.messages?.KNOWLEDGE_BASE_AI_ASSISTANT?.PATCH,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!errorStatesKnowledgeBasePost && messagesKnowledgeBasePost) {
      showSuccessToast(messagesKnowledgeBasePost);
    }
  }, [errorStatesKnowledgeBasePost, messagesKnowledgeBasePost]);

  useEffect(() => {
    if (!errorStatesKnowledgeBasePatch && messagesKnowledgeBasePatch) {
      showSuccessToast(messagesKnowledgeBasePatch);
    }
  }, [errorStatesKnowledgeBasePatch, messagesKnowledgeBasePatch]);

  useEffect(() => {
    if (!errorStatesKnowledgeBaseDelete && messagesKnowledgeBaseDelete) {
      showSuccessToast(messagesKnowledgeBaseDelete);
    }
  }, [errorStatesKnowledgeBaseDelete, messagesKnowledgeBaseDelete]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseChaptersPost &&
      messagesKnowledgeBaseChaptersPost
    ) {
      showSuccessToast(messagesKnowledgeBaseChaptersPost);
    }
  }, [errorStatesKnowledgeBaseChaptersPost, messagesKnowledgeBaseChaptersPost]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseChaptersPatch &&
      messagesKnowledgeBaseChaptersPatch
    ) {
      showSuccessToast(messagesKnowledgeBaseChaptersPatch);
    }
  }, [
    errorStatesKnowledgeBaseChaptersPatch,
    messagesKnowledgeBaseChaptersPatch,
  ]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseChaptersDelete &&
      messagesKnowledgeBaseChaptersDelete
    ) {
      showSuccessToast(messagesKnowledgeBaseChaptersDelete);
    }
  }, [
    errorStatesKnowledgeBaseChaptersDelete,
    messagesKnowledgeBaseChaptersDelete,
  ]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseLessonsPost &&
      messagesKnowledgeBaseLessonsPost
    ) {
      showSuccessToast(messagesKnowledgeBaseLessonsPost);
    }
  }, [errorStatesKnowledgeBaseLessonsPost, messagesKnowledgeBaseLessonsPost]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseLessonsPatch &&
      messagesKnowledgeBaseLessonsPatch
    ) {
      showSuccessToast(messagesKnowledgeBaseLessonsPatch);
    }
  }, [errorStatesKnowledgeBaseLessonsPatch, messagesKnowledgeBaseLessonsPatch]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseLessonsDelete &&
      messagesKnowledgeBaseLessonsDelete
    ) {
      showSuccessToast(messagesKnowledgeBaseLessonsDelete);
    }
  }, [
    errorStatesKnowledgeBaseLessonsDelete,
    messagesKnowledgeBaseLessonsDelete,
  ]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseTutorialsPost &&
      messagesKnowledgeBaseTutorialsPost
    ) {
      showSuccessToast(messagesKnowledgeBaseTutorialsPost);
    }
  }, [
    errorStatesKnowledgeBaseTutorialsPost,
    messagesKnowledgeBaseTutorialsPost,
  ]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseTutorialsPatch &&
      messagesKnowledgeBaseTutorialsPatch
    ) {
      showSuccessToast(messagesKnowledgeBaseTutorialsPatch);
    }
  }, [
    errorStatesKnowledgeBaseTutorialsPatch,
    messagesKnowledgeBaseTutorialsPatch,
  ]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseTutorialsDelete &&
      messagesKnowledgeBaseTutorialsDelete
    ) {
      showSuccessToast(messagesKnowledgeBaseTutorialsDelete);
    }
  }, [
    errorStatesKnowledgeBaseTutorialsDelete,
    messagesKnowledgeBaseTutorialsDelete,
  ]);

  useEffect(() => {
    if (!errorStatesKnowledgeBaseExamsPost && messagesKnowledgeBaseExamsPost) {
      showSuccessToast(messagesKnowledgeBaseExamsPost);
    }
  }, [errorStatesKnowledgeBaseExamsPost, messagesKnowledgeBaseExamsPost]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseExamsPatch &&
      messagesKnowledgeBaseExamsPatch
    ) {
      showSuccessToast(messagesKnowledgeBaseExamsPatch);
    }
  }, [errorStatesKnowledgeBaseExamsPatch, messagesKnowledgeBaseExamsPatch]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseExamsDelete &&
      messagesKnowledgeBaseExamsDelete
    ) {
      showSuccessToast(messagesKnowledgeBaseExamsDelete);
    }
  }, [errorStatesKnowledgeBaseExamsDelete, messagesKnowledgeBaseExamsDelete]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseTutorialGeneratorPost &&
      messagesKnowledgeBaseTutorialGeneratorPost
    ) {
      showSuccessToast(messagesKnowledgeBaseTutorialGeneratorPost);
    }
  }, [
    errorStatesKnowledgeBaseTutorialGeneratorPost,
    messagesKnowledgeBaseTutorialGeneratorPost,
  ]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseExamGeneratorPost &&
      messagesKnowledgeBaseExamGeneratorPost
    ) {
      showSuccessToast(messagesKnowledgeBaseExamGeneratorPost);
    }
  }, [
    errorStatesKnowledgeBaseExamGeneratorPost,
    messagesKnowledgeBaseExamGeneratorPost,
  ]);

  useEffect(() => {
    if (
      !errorStatesKnowledgeBaseAiAssistantPatch &&
      messagesKnowledgeBaseAiAssistantPatch
    ) {
      showSuccessToast(messagesKnowledgeBaseAiAssistantPatch);
    }
  }, [
    errorStatesKnowledgeBaseAiAssistantPatch,
    messagesKnowledgeBaseAiAssistantPatch,
  ]);

  return null;
};

export default SuccessOverlay;

