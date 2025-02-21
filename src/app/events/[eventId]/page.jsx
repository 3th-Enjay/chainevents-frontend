"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ApprovalIcon from "@/icons/ApprovalIcon";
import ValidationApprovalIcon from "@/icons/ValidationApprovalIcon";
import React, { useEffect, useState } from "react";

function Page({ params }) {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { eventId } = params;

  useEffect(() => {
    if (eventId) {
      fetch(`https://chainevents-backend.onrender.com/event/id/${eventId}`)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            setEventData(res.data);
          } else {
            setFetchError("Failed to fetch event data");
          }
          setLoading(false);
        })
        .catch((err) => {
          setFetchError(err);
          setLoading(false);
        });
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Loading event details...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 bg-red-100 text-red-700">
          Error fetching event details: {fetchError.message || fetchError}
        </div>
      </div>
    );
  }

  return (
    <div className="text-white overflow-x-hidden flex flex-col items-center bg-primaryBackground bg-[#1E1D1D] min-h-screen">
      <Navbar />
      <main className="pt-[74px] pb-[197px]">
        <div className="w-[740px] mx-auto bg-[#1E1D1D] rounded border-[.3px] border-[#FFFFFF] p-4 grid grid-cols-[250px_1fr] gap-x-6">
          <div>
            <img
              src={"/assets/eventImage.png"|| eventData.image_url }
              className="w-full mb-4"
              alt={eventData.name || "Event"}
            />
            <h3 className="pb-2 border-b-[.4px] border-b-[#C4C4CC44] mb-2">
              Hosted By
            </h3>
            <div className="flex flex-col gap-y-2 text-xs leading-4 font-medium py-2 mb-6">
              <div className="flex gap-x-2 items-center">
                <img
                  src="/assets/host-avatar.svg"
                  className="w-5 h-5"
                  alt="Host"
                />
                <h3>{eventData.event_owner || "Unknown Host"}</h3>
              </div>
            </div>
            <h3 className="text-[#D9D9D9] text-xs leading-4">Contact Host</h3>
            <h3 className="text-[#D9D9D9] mt-3 text-xs leading-4">
              Report Event
            </h3>
          </div>
          <div>
            <h2 className="text-xl leading-6 font-semibold mb-4">
              {eventData.name || "Event Name"}
            </h2>
            <div className="flex items-center">
              <img src="/assets/location-icon.png" alt="Location Icon" className="w-10 h-10 p-2" />
              <div>
                <h3 className="font-medium text-sm">
                  {eventData.location || "Event Location"}
                </h3>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <img src="/assets/date-icon.png" alt="Date Icon" className="w-10 h-10 p-2"/>
              <div>
                <h3 className="font-medium text-sm">
                  {eventData.event_start_date
                    ? new Date(eventData.event_start_date).toLocaleDateString()
                    : "Event Date"}
                </h3>
              </div>
            </div>
            <div className="p-2 pb-6 rounded bg-[#C4C4C40D] mt-[34px]">
              <h2 className="pb-2 text-xs border-b-[#C4C4CC44] border-b-[.4px] font-semibold text-white mb-4">
                Registration
              </h2>
              <div className="flex items-center mt-4 gap-2">
                <ValidationApprovalIcon />
                <div>
                  <h3 className="font-medium text-sm">
                    {eventData.require_approval ? "Approval Required" : "Open"}
                  </h3>
                  <h4 className="text-[#D9D9D9] text-xs">
                    {eventData.require_approval
                      ? "Your registration is subject to approval by the host"
                      : "Register now"}
                  </h4>
                </div>
              </div>
              <p className="text-xs font-semibold mt-5 mb-4">
                Welcome to join the Event, Please register below
              </p>
              <button className="py-2 text-sm font-semibold rounded-full text-[#3A3A3A] bg-[#D9D9D9] w-full">
                Request to Join
              </button>
            </div>
            <h2 className="pb-2 text-xs border-b-[#C4C4CC44] border-b-[.4px] font-semibold text-white mb-4 mt-4">
              About Event
            </h2>
            <p className="text-xs leading-5">
              {eventData.description ||
                "No description provided for this event."}
            </p>
            <h2 className="pb-2 text-xs border-b-[#C4C4CC44] border-b-[.4px] font-semibold text-white mb-4 mt-4">
              Location
            </h2>
            <h3 className="text-sm font-semibold">
              {eventData.location || "Event Location"}
            </h3>
            <img src="/assets/map.png" className="w-full mt-3" alt="Map" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Page;
