import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [listOfUsers, setListOfUsers] = useState([]);
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [username, setUsername] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:3000/getusers")
			.then((response) => setListOfUsers(response.data));
	}, []);

	const createUser = () => {
		axios
			.post("http://localhost:3000/createuser", {
				name,
				age,
				username,
			})
			.then((response) => {
				setListOfUsers([
					...listOfUsers,
					{
						name,
						age,
						username,
					},
				]);
			});
	};

	return (
		<div className='App'>
			<div className=''>
				{listOfUsers.map((user) => {
					return (
						<div key={user._id}>
							<h1>Name: {user.name}</h1>
							<h1>Age: {user.age}</h1>
							<h1>UserName: {user.username}</h1>
						</div>
					);
				})}
			</div>

			<div>
				<input
					type='text'
					placeholder='Name...'
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					type='number'
					placeholder='Age...'
					onChange={(e) => {
						setAge(e.target.value);
					}}
				/>
				<input
					type='text'
					placeholder='UserName...'
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<button onClick={createUser}>Create User</button>
			</div>
		</div>
	);
}

export default App;
