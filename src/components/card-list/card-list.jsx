import { useEffect } from "react";
import classes from "./card-list.module.scss";
import Tabs from "../tabs/tabs.jsx";
import CardItem from "../card-item/card-item.jsx";
import Button from "../button/button.jsx";
import { useSelector, useDispatch } from 'react-redux'
import { fetchGetTickets } from '../../store/aviasalesSlice.js'
import { Spin } from 'antd';

export default function CardList({ count, onCounter }) {
	const ticketsData = useSelector((store) => store.aviasales)
	const { dataTickets,
		filter,
		transferAll,
		transferWithout,
		transferOne,
		transferTwo,
		transferThree } = ticketsData
	const dispatch = useDispatch()

	const compareFnPrice = (a, b) => a.price - b.price

	const compareFnTime = (a, b) => {
		const segmentsA = a.segments
		const segmentsB = b.segments
		const durationA = segmentsA[0].duration
		const durationB = segmentsB[0].duration
		return durationA - durationB
	}

	const compareFnOptimal = (a, b) => {
		const segmentsA = a.segments
		const segmentsB = b.segments
		const durationA = segmentsA[0].duration
		const durationB = segmentsB[0].duration
		return (durationA + a.price) - (durationB + b.price)
	}

	const filterVisible = (f) => {
		switch (f) {
			case 'lowCost':
				return [...dataTickets].sort(compareFnPrice)
			case 'faster':
				return [...dataTickets].sort(compareFnTime)
			case 'optimal':
				return [...dataTickets].sort(compareFnOptimal)
		}
	}

	const data = filterVisible(filter)

	const filterTransfer = (tcktData) => {
		if (transferAll) {
			return tcktData
		}

		if (!transferWithout && !transferOne && !transferTwo && !transferThree) {
			return []
		}

		return tcktData.filter((el) => {
			const stopsDeparture = el.segments[0].stops.length
			const stopsArrival = el.segments[1].stops.length
			return (transferWithout && stopsDeparture === 0 && stopsArrival === 0) ||
				(transferOne && stopsDeparture === 1 && stopsArrival === 1) ||
				(transferTwo && stopsDeparture === 2 && stopsArrival === 2) ||
				(transferThree && stopsDeparture === 3 && stopsArrival === 3)
		})
	}

	const totalData = filterTransfer(data)

	const elements = totalData.slice(0, count).map((ticket) => {
		const id = Math.random() * 100
		return (
			<CardItem key={id}
				onTicket={ticket}
			/>
		)
	})

	const renderElements = Array.isArray(totalData) && totalData.length > 0 ? elements : <div>Рейсов, подходящих под заданные фильтры, не найдено.</div>
	const renderButton = Array.isArray(renderElements) ? <Button onCounter={onCounter} /> : null
	const renderSpin = ticketsData.status === 'loading' ? <Spin size="large" /> : null

	return (
		< div className={classes["wrapper-card-list"]} >
			<Tabs />
			{renderSpin}
			{renderElements}
			{renderButton}
		</div >
	);
}
