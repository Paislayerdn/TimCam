"use client";

import { useEffect, useState } from "react";
import "@/styles/members.css";

type Group = {
    id: number;
    name: string;
};

type Member = {
    id: number;
    name: string;
    group: string;
};

export default function MembersPage() {

    useEffect(() => {
        fetch("/api/members")
            .then((res) => res.json())
            .then((data) => {
                setMembers(data);
            });
    }, []);
    useEffect(() => {
        fetch("/api/groups")
            .then((res) => res.json())
            .then((data) => {
                setGroups(data);

                if (data.length > 0) {
                    setGroup(data[0].id);
                }
            });
    }, []);
    
    const [name, setName] = useState("");
    const [groups, setGroups] = useState<Group[]>([]);
    const [group, setGroup] = useState<number | null>(null);
    const [members, setMembers] = useState<Member[]>([]);

    async function addMember() {
        const trimmed = name.trim();

        if (!trimmed) return;

        const response = await fetch("/api/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: trimmed,
                group_id: group,
            }),
        });

        const newMember = await response.json();

        setMembers((previous) => [
            ...previous,
            newMember,
        ]);

        setName("");
    }

    async function deleteMember(id:number) {

        await fetch("/api/members", {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id
            })
        });


        setMembers((previous) =>
            previous.filter(
                (member) => member.id !== id
            )
        );
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
                    value={group ?? ""}
                    onChange={(e) => setGroup(Number(e.target.value))}
                >
                    {groups.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.name}
                        </option>
                    ))}
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
                                <td>
                                    {member.group}
                                </td>

                                <td>
                                    <button onClick={() => deleteMember(member.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}