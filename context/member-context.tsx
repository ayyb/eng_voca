import { createContext } from "react";

type Member ={
    no: number;
    id: string;
    name : string;
    created_at: string;
    member_level: number;
}

const memberInfomation: Member = {
    no: 1,
    id: "guest",
    name: "guest",
    created_at: "2021-09-01",
    member_level: 1
}

export const userContext = createContext(memberInfomation);

export const UserProvider = ( children : React.ReactNode) =>{
    return(
        <userContext.Provider value={memberInfomation}>
        {children}
        </userContext.Provider>
    )
}


