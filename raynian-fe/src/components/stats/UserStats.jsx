import React, { useEffect } from "react";
import CloseModalButton from "../util/CloseModalButton";
import {
  useGetStatsQuery,
  useUpdateStudyTimeMutation,
} from "../../slices/statsApi";
import { useDispatch, useSelector } from "react-redux";

const UserStats = (props) => {
  const { data } = useGetStatsQuery(props.id);
  const [updateStudyTime] = useUpdateStudyTimeMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const timerState = useSelector((state) => state.timer);

  const updateTotalStudyTime = async (totalStudyTimeMins) => {
    const data = { studyTime: totalStudyTimeMins };
    const res = await updateStudyTime({ id: userInfo.user._id, data });
  };

  useEffect(() => {
    if (userInfo?.user && userInfo.user._id != "guest") {
      updateTotalStudyTime(timerState.totalStudyTimeMins);
    }
  }, []);

  return (
    <div
      className="relative flex h-[80%] w-[80%] flex-col gap-6 rounded-3xl bg-neutral-50 p-4 px-[30px] py-10"
      onClick={(event) => event.stopPropagation()}
    >
      {props.id}
      <button>test</button>

      <CloseModalButton />
      <div></div>
    </div>
  );
};

export default UserStats;
