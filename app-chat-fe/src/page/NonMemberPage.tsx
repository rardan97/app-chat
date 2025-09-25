// import MemberInviteList from "@/components/member/MemberInvitelist"
import MemberInviteList from "@/components/nonmember/MemberInviteList"
import NonMemberList from "@/components/nonmember/NonMemberList"


function NonMemberPage() {
    return (
        <> 
        <div className="w-full bg-[#010425] text-[#CBD5E1]">
  

    <MemberInviteList />
  
    <NonMemberList />
</div>
            {/* <div className="w-full bg-[#010425] text-[#CBD5E1]">
                <MemberInviteList />
                <NonMemberList />
            </div> */}
        </>
    )
}

export default NonMemberPage
