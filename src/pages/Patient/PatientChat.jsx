import React, { useEffect, useState } from "react";
import PatientNavbar from "../../components/Navbar/PatientNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatients,
  fetchPatientsForChat,
} from "../../store/Slices/PatientSlice";
import { fetchContacts } from "../../store/Slices/ContactsSlice";
import { SendMessageAPI } from "../../Api_Requests/Api_Requests";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast";
import moment from "moment";

const PatientChat = () => {
  const dispatch = useDispatch();
  const PatientState = useSelector((state) => state.PatientState);
  const ContactsState = useSelector((state) => state.ContactsState);
  const AuthState = useSelector((state) => state.AuthState);
  const [SelectedId, setSelectedId] = useState("");
  const [Message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchContacts(AuthState.data));
  }, [dispatch, AuthState.data]);

  useEffect(() => {
    console.log(AuthState.data.patientId._id);
    console.log(
      PatientState.data.find((dt) => dt._id === AuthState.data.patientId._id)
        ?.Chats
    );
  }, [PatientState.data, AuthState.data.patientId._id]);

  return (
    <div className="w-screen min-h-screen bg-aliceblue">
      <PatientNavbar />
      <div className="flex justify-center items-center w-full">
        <div className="w-[90%]">
          <div
            className="w-full text-custom-bg font-[400] font-montserrat text-7xl flex justify-center items-center py-7"
            style={{ textShadow: "#768A9E 1px 0 10px" }}
          >
            Chat
          </div>
          <div className="flex w-full border-2 border-custom-bg rounded-lg">
            <div className="w-[400px] flex flex-col">
              <div className="font-montserrat font-bold text-center py-8 bg-custom-bg text-white">
                Contact List
              </div>
              <div className="flex flex-col items-center py-2">
                {ContactsState.data &&
                  ContactsState.data.map((dt) => {
                    return AuthState.data.role === 2 ? (
                      <div
                        key={dt.patientId._id}
                        onClick={() => {
                          console.log(dt.patientId._id);
                        }}
                      >
                        <img
                          className="w-[80px] h-[80px] object-contain"
                          src={dt.patientId.imageUrl}
                          alt=""
                        />
                        <div className="">{dt.patientId.name}</div>
                      </div>
                    ) : (
                      <div
                        key={dt.doctorId._id}
                        className="cursor-pointer flex items-center font-montserrat gap-x-4 border-2 border-custom-bg rounded-[40px] overflow-hidden w-[300px] hover:bg-custom-bg hover:text-white transition-all ease-in-out duration-500"
                        onClick={() => {
                          setSelectedId(dt.doctorId._id);
                        }}
                      >
                        <img
                          className="w-[70px] rounded-full h-[70px] object-cover border-4 border-white"
                          src={dt.doctorId.imageUrl}
                          alt=""
                        />
                        <div className="font-bold">{dt.doctorId.name}</div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="w-full">
              <div className="font-montserrat font-bold text-center py-8 bg-custom-bg text-white">
                Messages
              </div>
              <div className="bg-white flex flex-col h-[70vh] rounded-lg overflow-y-auto border-l-2 border-l-custom-bg">
                {PatientState.data
                  .find((dt) => dt._id === AuthState.data.patientId._id)
                  ?.Chats.filter((dt) => {
                    return dt.doctorId === SelectedId;
                  })
                  .map((d) => {
                    return (
                      <div
                        key={d._id}
                        className={`px-2 py-2 w-full font-montserrat text-white font-semibold ${
                          d.user_type === 1
                            ? "flex justify-start items-center"
                            : d.user_type === 2 &&
                              "flex justify-end items-center"
                        }`}
                      >
                        <div
                          className={`w-fit px-4 pt-3 ${
                            d.user_type === 1
                              ? "bg-custom-bg-hover rounded-t-md rounded-br-md"
                              : d.user_type === 2 &&
                                "bg-custom-bg rounded-t-md rounded-bl-md"
                          }`}
                        >
                          {d.message}
                          <div className="text-xs py-2 justify-end">
                            {moment(new Date(d.date * 1000)).format(
                              "DD-MM-YY - hh:mm A"
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <textarea
                type="text"
                placeholder="Enter Message"
                className="w-full py-2 px-4 min-h-[10vh] rounded-lg border-2 border-custom-bg-hover font-montserrat"
                value={Message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              />
              <div className="w-full flex justify-end mb-2 px-2">
                <div
                  className="px-3 py-2 border-2 border-custom-bg bg-custom-bg text-white hover:bg-custom-bg-hover rounded-lg transition-all ease-in-out duration-500 cursor-pointer"
                  onClick={async () => {
                    try {
                      const response = await SendMessageAPI({
                        patientId: AuthState.data.patientId._id,
                        doctorId: SelectedId,
                        message: Message,
                        date: Math.floor(new Date() / 1000),
                        sender: 2,
                      });
                      if (response?.data?.success) {
                        dispatch(fetchPatientsForChat());
                        setMessage("");
                        SuccessToast(response.data?.data?.msg);
                      }
                    } catch (err) {
                      ErrorToast(err.response?.data?.error?.msg || err.message);
                    }
                  }}
                >
                  Send
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientChat;
