import logo from './logo.svg';
import './App.css';
import styles from "./styles.module.css"
import { useEffect, useRef, useState } from 'react';

function App() {
	const list = ["sachin", "virat", "react", "next", "mongodb", "sql", "postgres", "django", "express"];
	const [chips, setChips] = useState([]);                // to store values in the chips 
	const [name, setName] = useState("");                  // value in the input field
	const [options, setOptions] = useState(list);          // values in the dropdown
	const list_without_chips = useRef(list);               // store values which are not in the chips
	const my_ref = useRef(null);                           // to retain focus on input field
	const [deleteChip, setDeleteChip] = useState(false);   // to check whether backspace is pressed to highlight the previous chip 


	/// function to find values which are not in the chips
	const check_in_chips = (temp_chips) => {
		const temp = [];
		for (let x of list) {
			let flag = 0;

			for (let y of temp_chips) {
				if (x === y) {
					flag = 1;
					break;
				}
			}
			if (!flag) {
				temp.push(x);
			}
		}
		setOptions(temp);
		list_without_chips.current = temp;
	}

	// function to find matching options in the list
	const change = (e) => {
		setName(e.target.value);
		if (e.target.value !== "") {
			const data = e.target.value;
			const temp_options = [];

			for (let x of list_without_chips.current) {
				const n = x.search(data); // pattern checking
				if (n !== -1) {
					temp_options.push(x);
				}
			}
			setOptions(temp_options);
		}
		else {
			setOptions(list_without_chips.current); // if empty input then again resetting options 
		}
	}

	// to add chip 
	const addChip = (e) => {
		const temp = chips;
		temp.push(e.target.id);
		check_in_chips(temp);
		setChips(temp);
		setName("");
		my_ref.current.focus();
	}

	// to delete chip
	const delete_chip = (id) => {
		const temp = chips.filter((item) => (item !== id));
		check_in_chips(temp);
		setChips(temp);
		my_ref.current.focus();
	}

	// function to solve bonus task of backspace delete
	const backspace_delete = (e) => {
		if (e.keyCode === 8 && name === "") {
			if (!deleteChip) {
				setDeleteChip(true);
			}
			else {
				if (chips.length > 0) {
					delete_chip(chips[chips.length - 1]);
					setDeleteChip(false);
				}
			}
		}
	}
	useEffect(() => {
		my_ref.current.focus();
	}, [])
	return (
		<div className="App">

			<div className={styles["container"]}>
				<h1>Pick Users</h1>
				<div>
					{
						chips.map((item, index) => {
							let btn_class = [styles["btn-sm"]];
							if (index === chips.length - 1 && deleteChip) {
								btn_class = [styles["btn-sm"], styles["btn-highlighted"]].join(' ');
							}
							return (<span>
								<button className={btn_class}>
									{item}
									<span>
										<button className={styles["circular-btn"]} onClick={(e) => delete_chip(e.target.id)} id={item}>X</button>
									</span>
								</button>
							</span>)
						})
					}


					<span className={styles["dropdown"]}>
						<input ref={my_ref} value={name} onChange={change} onKeyDown={backspace_delete} placeholder='Add USer'></input>
						<div className={[styles["dropdown-menu"]].join(' ')}>
							{
								options.map((item, index) => {

									return (
										<div className={styles["dropdown-item"]} onClick={addChip} id={item}>
											{item}
										</div>)
								})
							}
						</div>
						<hr></hr>


					</span>





				</div>
			</div>
		</div>
	);
}

export default App;
