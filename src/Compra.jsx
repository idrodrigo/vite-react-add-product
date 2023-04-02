import React, { useState, useReducer, useRef } from 'react'

const types = {
  menos: 'menos',
  mas: 'mas',
  delete: 'delete',
  buy: 'buy'
}
const inicialValue = [
  {
    id: 1,
    name: 'agua',
    cantidad: '3'
  },
  {
    id: 2,
    name: 'pan',
    cantidad: '2'
  }
]

const reducer = (state, action) => {
  switch (action.type) {
    case types.menos:
      return state.map(e =>
        (action.payload === e.id && e.cantidad > 1)
          ? { ...e, cantidad: e.cantidad - 1 }
          : e
      )

    case types.mas:
      return state.map(e =>
        (action.payload === e.id)
          ? { ...e, cantidad: e.cantidad + 1 }
          : e
      )
    case types.delete:
      return state.filter(
        e => e.id !== action.payload
      )
    case types.buy:
      return [...state, action.payload]
    default:
      return state
  }
}

export const Compra = () => {
  const inputName = useRef(null)
  const [miProducto, setMiProdructo] = useState('')
  const [list, dispatch] = useReducer(reducer, inicialValue)
  return (
    <>
      <label htmlFor='producto'> Producto: </label>
      <input
        ref={inputName}
        id='producto'
        value={miProducto}
        onChange={(e) => setMiProdructo(e.target.value)}
      />
      <button onClick={() => {
        inputName.current.focus()
        setMiProdructo('')
        dispatch({
          type: types.buy,
          payload: { id: Date.now(), name: miProducto, cantidad: 1 }
        })
      }}
      >
        Add
      </button>
      {list.map((producto) => (
        <div key={producto.id}>
          {producto.name} ({producto.cantidad} unidades)
          <button
            onClick={() =>
              dispatch({ type: types.menos, payload: producto.id })}
          >
            -
          </button>
          <button
            onClick={() =>
              dispatch({ type: types.mas, payload: producto.id })}
          >
            +
          </button>
          <button
            onClick={() =>
              dispatch({ type: types.delete, payload: producto.id })}
          >
            x
          </button>

        </div>
      ))}
    </>
  )
}
