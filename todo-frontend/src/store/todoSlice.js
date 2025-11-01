import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axiosInstance"

const initialState = {
    list: [],
    loading: false,
    error:  null
}

export const fetchTodos = createAsyncThunk("/todos/get-todos", async (todoData, thunkAPI) => {
    try {
        const res = await axios.get("/todos/get-todos")
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const addTodo = createAsyncThunk("/todos/create-todo", async (todoData, thunkAPI) => {
    try {
        const res = await axios.post("/todos/create-todo", todoData);
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add todo")
    }
})

export const updateTodo = createAsyncThunk("/todos/update-todo", async (todoData, thunkAPI) => {
    try {
        const res = await axios.put(`/todos/update-todo/${todoData.id}`, todoData);
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update todo")
    }
})

export const deleteTodo = createAsyncThunk("/todos/delete-todo", async (id, thunkAPI) => {
    try {
        await axios.delete(`/todos/delete-todo/${id}`);
        return id
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete todo")
    }
})

export const aiTodo = createAsyncThunk("/perplexity/parse-todo", async (input, thunkAPI) => {
    try {
        const { data } = await axios.post("/perplexity/parse-todo", input);

        console.log(data)

        const res = await axios.post("/todos/create-todo", data)

        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add todo")
    }
})

const todoSlice = createSlice({
    name: "todos",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch todos";
            })

            // Add Todo
            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add todo";
            })

            //Update Todo
            .addCase(updateTodo.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.list.findIndex((t) => t._id === action.payload._id)
                if (idx > -1) {
                    state.list[idx] = action.payload
                }
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to update todo"
            })

            //Delete todo
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((t) => t._id !== action.payload);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete todo"
            })

            //AI Todo
            .addCase(aiTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(aiTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(aiTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add todo";
            })
    }
})

export default todoSlice.reducer