import { useState, useEffect } from "react";
import aviasalesLogo from "./assets/aviasalesLogo.svg";
import s7logo from "./assets/S7logo.svg";
import "./App.scss"
import Filter from "./components/filter/filter.jsx"
import Head from "./components/head/head.jsx"
import CardList from "./components/card-list/card-list.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { fetchAviasales, fetchGetTickets } from './store/aviasalesSlice'

function App() {
	const ticketsData = useSelector((store) => store.aviasales)
	const dispatch = useDispatch()
	const [visibleCount, setvisibleCount] = useState(5)

	const counter = () => {
		setvisibleCount((prev) => prev + 5)
	}

	useEffect(() => {
		if (!ticketsData.searchId) {
			dispatch(fetchAviasales())
		} else if (ticketsData.status !== 'loading' && ticketsData.dataTickets.length === 0) {
			dispatch(fetchGetTickets(ticketsData.searchId));
		}
	}, [dispatch, ticketsData.searchId, ticketsData.status, ticketsData.dataTickets])

	return (
		<>
			<Head />
			<div className="wrapper-filter-cardlist">
				<Filter />
				<CardList
					count={visibleCount}
					onCounter={counter}
				/>
			</div>
		</>
	);
}

export default App;
