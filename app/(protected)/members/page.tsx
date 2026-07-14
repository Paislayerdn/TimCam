"use client";

import { useState } from "react";
import "@/styles/members.css";

type Group = "PM" | "SA" | "Dev" | "UX/UI";

type Member = {
    id: number;
    name: string;
    group: Group;
};

export default function MembersPage() {
    const [name, setName] = useState("");
    const [group, setGroup] = useState<Group>("Dev");
    const [members, setMembers] = useState<Member[]>([]);

    function addMember() {
        const trimmed = name.trim();

        if (!trimmed) return;

        const newMember: Member = {
            id: Date.now(),
            name: trimmed,
            group,
        };

        setMembers((previous) => [...previous, newMember]);

        setName("");
    }

    return (
        <main className="members-page">
            <h1>Members</h1>

            <div className="member-form">
                <label>Name</label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter member name"
                />

                <label>Primary Group</label>

                <select
                    value={group}
                    onChange={(e) => setGroup(e.target.value as Group)}
                >
                    <option value="PM">PM</option>
                    <option value="SA">SA</option>
                    <option value="Dev">Dev</option>
                    <option value="UX/UI">UX/UI</option>
                </select>

                <button onClick={addMember}>
                    Add Member
                </button>
            </div>

            <div className="member-list">
                <h2>Member List</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Primary Group</th>
                        </tr>
                    </thead>

                    <tbody>
                        {members.map((member) => (
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{member.group}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}