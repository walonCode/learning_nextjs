export default async function UserProfile({ params, }:{params: Promise<{id: string | number}>}){
    const id = (await params).id
    return(
        <div>
            <h1>User Profile</h1>
            <hr />
            <p>{id}</p>
        </div>
    )
}