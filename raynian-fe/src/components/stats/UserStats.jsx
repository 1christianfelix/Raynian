import React from "react";
import CloseModalButton from "../util/CloseModalButton";
import {
  useGetStatsQuery,
  useUpdateStudyTimeMutation,
} from "../../slices/statsApi";

const UserStats = (props) => {
  const { data } = useGetStatsQuery(props.id);
  const [updateStudyTime] = useUpdateStudyTimeMutation();
  console.log(data);
  // console.log(props);
  const test = async () => {
    const studyTime = 111;
    const data = { studyTime };
    const res = await updateStudyTime({ id: props.id, data });
    if (res) console.log(res);
  };
  return (
    <div
      className="relative flex h-[80%] w-[80%] flex-col gap-6 rounded-3xl bg-neutral-50 p-4 px-[30px] py-10"
      onClick={(event) => event.stopPropagation()}
    >
      {props.id}
      <button onClick={test}>test</button>

      <CloseModalButton />
      <div></div>
    </div>
  );
};

export default UserStats;
