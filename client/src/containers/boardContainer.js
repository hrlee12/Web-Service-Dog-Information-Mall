import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BoardCreate } from "../pages/BoardCreate";
import { BoardDetail } from "../pages/BoardDetail";
import { BoardPage } from "../pages/BoardPage";
import axios from "axios";
import { API_BASE_URL } from "./app-config";
import { useParams, useNavigate } from "react-router-dom";
import {
  getData,
  getAllData,
  getNewData,
  getSearchWord,
  getSelectOption,
  getSearchData,
  getSearchMode,
  addLike,
} from "../store/boardReducer";

////////////////////////////////////////////////////////////////////////////////
export const BoardPageContainer = () => {
  const navigate = useNavigate();

  const contents = useSelector((state) => state.board.allData);
  const selectOption = useSelector((state) => state.board.selectOption);
  const searchWord = useSelector((state) => state.board.searchWord);
  const searchData = useSelector((state) => state.board.searchData);
  const searchMode = useSelector((state) => state.board.searchMode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchData([]));
    dispatch(getSearchWord(""));
    dispatch(getSelectOption("title"));
    dispatch(getSearchMode(false));
    const getContents = async () => {
      const res = await axios.get(API_BASE_URL + "/board");
      dispatch(getAllData(res.data));
    };
    getContents();
  }, []);

  const onSelect = (e) => {
    dispatch(getSelectOption(e.target.value));
  };
  const onSearchWord = (e) => {
    dispatch(getSearchWord(e.target.value));
  };
  const onCompleteSearch = async () => {
    const trimedWord = searchWord.trim();
    if (trimedWord === "") {
      alert("검색 키워드를 입력하세요.");
      return;
    }
    const res = await axios.post(API_BASE_URL + "/board/searchContent", {
      selectOption: selectOption,
      searchWord: trimedWord,
    });
    dispatch(getSearchData(res.data));
    dispatch(getSearchMode(true));
    dispatch(getSearchWord(""));
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      onCompleteSearch();
    }
  };

  return (
    <BoardPage
      contents={contents}
      navigate={navigate}
      onSelect={onSelect}
      onSearchWord={onSearchWord}
      searchWord={searchWord}
      onCompleteSearch={onCompleteSearch}
      selectOption={selectOption}
      searchData={searchData}
      searchMode={searchMode}
      onEnter={onEnter}
    />
  );
};

////////////////////////////////////////////////////////////////////////////////
export const BoardDetailContainer = () => {
  const navigate = useNavigate();
  const contentDetail = useSelector((state) => state.board.data);
  const dispatch = useDispatch();
  const { contentId } = useParams();
  const [readOnly, setReadOnly] = useState(true);
  useEffect(() => {
    const getContentDetail = async () => {
      const res = await axios.get(API_BASE_URL + "/board/" + contentId);
      dispatch(getData(res.data));
    };
    getContentDetail();
  }, []);
  const onStartEditContent = () => {
    setReadOnly(!readOnly);
  };
  const onCompleteEditContent = () => {
    editContent(contentDetail);
    alert("글 수정이 완료되었습니다.");
    setReadOnly(!readOnly);
  };
  const onTitleEditEvent = (e) => {
    if (readOnly === false) {
      const newData = {
        id: contentDetail.id,
        user_id: contentDetail.user_id,
        title: e.target.value,
        body: contentDetail.body,
        view_count: contentDetail.view_count,
        recommend_count: contentDetail.recommend_count,
        date: contentDetail.date,
        ["user.grade"]: contentDetail["user.grade"],
        ["user.nickname"]: contentDetail["user.nickname"],
      };
      dispatch(getData(newData));
    } else {
      return;
    }
  };
  const onBodyEditEvent = (e) => {
    if (readOnly === false) {
      const newData = {
        id: contentDetail.id,
        user_id: contentDetail.user_id,
        title: contentDetail.title,
        body: e.target.value,
        view_count: contentDetail.view_count,
        recommend_count: contentDetail.recommend_count,
        date: contentDetail.date,
        ["user.grade"]: contentDetail["user.grade"],
        ["user.nickname"]: contentDetail["user.nickname"],
      };
      dispatch(getData(newData));
    }
  };
  const editContent = async (newContent) => {
    await axios.patch(
      API_BASE_URL + "/board/editContent/" + contentId,
      newContent
    );
  };
  const deleteContent = async () => {
    await axios.delete(API_BASE_URL + "/board/deleteContent/" + contentId);
  };
  const onDeleteContent = () => {
    if (window.confirm("이 글을 삭제하시겠습니까?")) {
      deleteContent();
      alert("글이 삭제되었습니다!");
      navigate(-1);
    } else {
      alert("글 삭제를 취소합니다!");
    }
  };
  const onAddLike = async () => {
    dispatch(addLike()); // 화면 표시
    await axios.patch(API_BASE_URL + "/board/addLike/" + contentId, {
      recommend_count: contentDetail.recommend_count,
    }); // 백엔드 반영
  };

  return (
    <BoardDetail
      content={contentDetail}
      onStartEditContent={onStartEditContent}
      onCompleteEditContent={onCompleteEditContent}
      onTitleEditEvent={onTitleEditEvent}
      onBodyEditEvent={onBodyEditEvent}
      readOnly={readOnly}
      onDeleteContent={onDeleteContent}
      onAddLike={onAddLike}
    />
  );
};

////////////////////////////////////////////////////////////////////////////////
export const BoardCreateContainer = () => {
  // TODO : 로그인 유저 정보 불러와서 prop 줘야함!!!
  const navigate = useNavigate();
  const contentDetail = useSelector((state) => state.board.newData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewData({ user_id: "", title: "", body: "", date: "" }));
  }, []);

  const timestamp = () => {
    var today = new Date();
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace("T", " ").substring(0, 19);
  };
  const titleEditEvent = (e) => {
    const newData = {
      user_id: "",
      title: e.target.value,
      body: contentDetail.body,
      date: "",
    };
    dispatch(getNewData(newData));
  };
  const bodyEditEvent = (e) => {
    const newData = {
      user_id: "",
      title: contentDetail.title,
      body: e.target.value,
      date: "",
    };
    dispatch(getNewData(newData));
  };
  const contentSave = async () => {
    const nowTime = timestamp();
    const newContent = {
      user_id: "banana", // 수정해야함!!!
      title: contentDetail.title,
      body: contentDetail.body,
      date: nowTime,
    };
    await axios.post(API_BASE_URL + "/board/addContent", newContent);
    alert("작성하신 글이 제출되었습니다!");
    navigate(-1);
  };

  return (
    <BoardCreate
      onContentSave={contentSave}
      onTitleEditEvent={titleEditEvent}
      onBodyEditEvent={bodyEditEvent}
      content={contentDetail}
    />
  );
};