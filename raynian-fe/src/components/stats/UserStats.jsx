import React, { useEffect, useState } from "react";
import CloseModalButton from "../util/CloseModalButton";
import {
  useGetStatsQuery,
  useUpdateStudyTimeMutation,
} from "../../slices/statsApi";
import { useDispatch, useSelector } from "react-redux";

const UserStats = ({ user }) => {
  const { data } = useGetStatsQuery(user.id);
  const [updateStudyTime] = useUpdateStudyTimeMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const timerState = useSelector((state) => state.timer);
  const [userState, setUserStats] = useState(null);

  // const updateTotalStudyTime = async (totalStudyTimeMins) => {
  //   const data = { studyTime: totalStudyTimeMins };
  //   const res = await updateStudyTime({ id: userInfo.user._id, data });
  // };

  // useEffect(() => {
  //   if (userInfo?.user && userInfo.user._id != "guest") {
  //     updateTotalStudyTime(timerState.totalStudyTimeMins);
  //   }
  // }, []);

  // Get User name
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.id != "guest") {
          const response = await fetch(
            `http://localhost:4000/api/user/${user.id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch stats");
          } else {
            const data = await response.json();
          }
        }
      } catch (e) {
        // console.log("error", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="relative flex h-[60%] w-[80%] flex-col gap-6 rounded-3xl bg-neutral-50 p-4 px-[30px] py-10"
      onClick={(event) => event.stopPropagation()}
    >
      <CloseModalButton />
      <div className="text-2xl font-bold">{user.username}</div>
      <div className=""></div>
    </div>
  );
};

export default UserStats;
