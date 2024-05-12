import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Ensure this is the correct path to the Modal component
import logoImage from '../assets/logo_placeholder.png'; // Ensure correct path is used

// Define state outside the component for exporting functions
const members = ["Member 1", "Member 2", "Member 3", "Member 4", "Member 5"];
const churchMembers = ["Chenelyn Hernandez", "Kyla Shingaling", "Wreckit Ralph", "America Joy"];

export default function ChurchMembers() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [membersState, setMembers] = useState(members);
    const [churchMembersState, setChurchMembers] = useState(churchMembers);
    const navigate = useNavigate();

    const handleViewClick = (member) => {
        navigate('/ChurchInfo', { state: { member } });
    };

    const openModal = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleAccept = (member) => {
        setMembers(currentMembers => currentMembers.filter(m => m !== member));
        setChurchMembers(currentChurchMembers => [member, ...currentChurchMembers]);
        closeModal();
    };

    const handleDecline = (member) => {
        setMembers(currentMembers => currentMembers.filter(m => m !== member));
    };
    return (
        <div className="p-6 max-w-[375px] font-poppins mx-auto">
             {/* Place DashChurch at the desired position */}
            <h1 className="text-[28px] font-extrabold text-center mt-8 mb-6">CHURCH ACCOUNT</h1>
            <div className="flex items-center mb-4">
                <span className="font-semibold text-[0.75rem]">Pending Applications</span>
                <div className="relative ml-2">
                    <div className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {members.length}
                    </div>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg w-full">
                {members.map((member, index) => (
                    <div key={index} className="flex justify-between text-[0.75rem] items-center my-3">
                        <div className="flex items-center">
                            <img src={logoImage} alt="Logo" className="w-10 h-10 object-cover mr-2 ml-2" />
                            <span>{member}</span>
                        </div>
                        <div>
                            <button onClick={() => openModal(member)} className="bg-green-500 text-white ml-4 px-2 py-1 rounded text-xs">ACCEPT</button>
                            <button onClick={() => handleDecline(member)} className="bg-red-500 text-white ml-2 px-2 py-1 rounded text-xs">DECLINE</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg w-full mt-4">
                <h2 className="font-semibold text-[0.75rem] inline">Church Members <span className="bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">{churchMembers.length}</span></h2>
                {churchMembers.map((member, index) => (
                    <div key={index} className="flex justify-between text-[0.75rem] items-center my-2">
                        <div className="flex items-center">
                            <img src={logoImage} alt="Logo" className="w-10 h-10 object-cover mr-2 ml-2" />
                            <span>{member}</span>
                        </div>
                        <button onClick={() => handleViewClick(member)} className="bg-black text-white ml-4 px-2 py-1 rounded text-xs">VIEW</button>
                    </div>
                ))}
            </div>
            {isModalOpen && <Modal member={selectedMember} closeModal={closeModal} acceptHandler={handleAccept} />}
            
        </div>
        
    );
}
export const getPendingCount = () => members.length;
export const getCurrentCount = () => churchMembers.length;