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

    const [name, setName] = useState("");

    const [groups, setGroups] = useState<Group[]>([]);

    const [group, setGroup] = useState<number | null>(null);

    const [members, setMembers] = useState<Member[]>([]);



    // Load members
    useEffect(() => {

        fetch("/api/members")
            .then((res) => res.json())
            .then((data) => {
                setMembers(data);
            });

    }, []);



    // Load groups
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




    async function addMember() {

        const trimmed = name.trim();


        if (!trimmed || !group) {
            return;
        }


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




    async function deleteMember(id: number, memberName: string) {


        const confirmed = confirm(
            `Delete ${memberName}?`
        );


        if (!confirmed) {
            return;
        }



        await fetch("/api/members", {

            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                id,
            }),

        });



        setMembers((previous) =>
            previous.filter(
                (member) => member.id !== id
            )
        );

    }





    function editMember(id: number) {

        // TODO:
        // Open edit form / modal later

        console.log(
            "Edit member:",
            id
        );

    }





    return (

        <main className="members-page">


            <h1 className="members-title">
                Members
            </h1>



            <div className="members-container">


                <div className="member-form">


                    <label>
                        Name
                    </label>


                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Enter member name"
                    />



                    <label>
                        Primary Group
                    </label>



                    <select

                        value={group ?? ""}

                        onChange={(e) =>
                            setGroup(
                                Number(e.target.value)
                            )
                        }

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


                    <h2>
                        Member List
                    </h2>



                    <table>


                        <thead>

                            <tr>

                                <th>
                                    Name
                                </th>


                                <th>
                                    Primary Group
                                </th>


                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>





                        <tbody>


                            {members.map((member) => (

                                <tr key={member.id}>


                                    <td>
                                        {member.name}
                                    </td>



                                    <td>
                                        {member.group}
                                    </td>



                                    <td className="member-actions">


                                        <button

                                            onClick={() =>
                                                editMember(member.id)
                                            }

                                        >
                                            Edit
                                        </button>



                                        <button

                                            onClick={() =>
                                                deleteMember(
                                                    member.id,
                                                    member.name
                                                )
                                            }

                                        >
                                            Delete
                                        </button>


                                    </td>


                                </tr>

                            ))}


                        </tbody>


                    </table>


                </div>


            </div>


        </main>

    );

}