import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	dataTickets: [],
	searchId: '',
	status: null,
	error: null,
	filter: 'lowCost',
	transferAll: true,
	transferWithout: true,
	transferOne: true,
	transferTwo: true,
	transferThree: true,
}

//Получение searchId
export const fetchAviasales = createAsyncThunk(
	'aviasales/fetchAviasales',
	async function(_, {rejectWithValue}) {
		try {
			const res = await fetch('https://aviasales-test-api.kata.academy/search')
			if (!res.ok) {
				throw new Error(`Could not fetch https://aviasales-test-api.kata.academy/search, recieved ${res.status}`)
			}
			const data = await res.json()
			return data
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

//Получение пачки билетов
export const fetchGetTickets = createAsyncThunk(
	'aviasales/fetchGetTickets',
	async function(id, {rejectWithValue}) {
		if (!id) {
			return rejectWithValue('Search ID is required')
		} else {
			try {
				const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`)
				if (!res.ok) {
					throw new Error(`Could not fetch https://aviasales-test-api.kata.academy/titickets?searchId=${id}, recieved ${res.status}`)
				}
				const data = await res.json()
				return data
			} catch (err) {
				return rejectWithValue(err.message)
			}
		}
		
	}
)	

export const aviasalesSlice = createSlice({
	name: 'aviasales',
	initialState,
	reducers: {
		showTickets: (state, action) => {
			console.log('action: showTickets')
		},
		filterChangeFaster: (state) => {
			state.filter = 'faster'
		},
		filterChangeLowCost: (state) => {
			state.filter = 'lowCost'
		},
		filterChangeOptimal: (state) => {
			state.filter = 'optimal'
		},
		checkedStatusAll: (state) => {
			state.transferAll = !state.transferAll
			state.transferWithout = state.transferAll
			state.transferOne = state.transferAll
			state.transferTwo = state.transferAll
			state.transferThree = state.transferAll
		},
		checkedStatusWithout: (state) => {
			state.transferWithout = !state.transferWithout
			state.transferAll = false
			if (state.transferWithout && state.transferOne && state.transferTwo && state.transferThree) state.transferAll = true
		},
		checkedStatusOne: (state) => {
			state.transferOne = !state.transferOne
			state.transferAll = false
			if (state.transferWithout && state.transferOne && state.transferTwo && state.transferThree) state.transferAll = true
		},
		checkedStatusTwo: (state) => {
			state.transferTwo = !state.transferTwo
			state.transferAll = false
			if (state.transferWithout && state.transferOne && state.transferTwo && state.transferThree) state.transferAll = true
		},
		checkedStatusThree: (state) => {
			state.transferThree = !state.transferThree
			state.transferAll = false
			if (state.transferWithout && state.transferOne && state.transferTwo && state.transferThree) state.transferAll = true
		},
		//весь функционал экшэнов
	},
	extraReducers: (builder) => {
		//fetchAviasales
		builder.addCase(fetchAviasales.pending, (state) => {
			state.status = 'loading'
			state.error = null
		})
		builder.addCase(fetchAviasales.fulfilled, (state, action) => {
			state.status = 'resolved'
			if (!state.searchId && action.payload && action.payload.searchId) {
				state.searchId = action.payload.searchId
			}
		})
		builder.addCase(fetchAviasales.rejected, (state, action) => {
			state.status = 'rejected'
			state.error = action.payload

		})

		//fetchGetTickets
		builder.addCase(fetchGetTickets.pending, (state) => {
			state.status = 'loading'
			state.error = null
		})
		builder.addCase(fetchGetTickets.fulfilled, (state, action) => {
			state.status = 'resolved'
			const value = action.payload ? action.payload.tickets : []
			state.dataTickets = value
		})
		builder.addCase(fetchGetTickets.rejected, (state, action) => {
			state.status = 'rejected'
			state.error = action.payload

		})
	},
})

export const { showTickets, 
					filterChangeFaster, 
					filterChangeLowCost, 
					filterChangeOptimal, 
					checkedStatusAll,
					checkedStatusWithout,
					checkedStatusOne,
					checkedStatusTwo,
					checkedStatusThree } = aviasalesSlice.actions

export default aviasalesSlice.reducer