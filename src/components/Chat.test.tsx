import React from 'react';
import { render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import userEvent from "@testing-library/user-event";

import Chat from "./Chat";

const { any, stringContaining, objectContaining } = expect

beforeEach(fetch.resetMocks)

describe('Chatbot',() => {
  it('shows loader initially', async() => {
    render(<Chat />)
    await waitForElementToBeRemoved(screen.queryByRole('status', { name: /laden/i }))
  })

  it('shows first question',async () => {
    fetch.mockResponse(JSON.stringify([{ id: 100, text: 'Frage 1', valueOptions: [] }]))
    render(<Chat />)
    expect(await screen.findByText('Frage 1')).toBeInTheDocument()
  })

  it('shows answers to first question', async() => {
    fetch.mockResponse(JSON.stringify([{
      id: 100,
      text: 'Frage 1',
      valueOptions: [
        { nextId: 201, value: true, text: 'Ja'},
        { nextId: 202, value: false, text: 'Nein'}
      ]
    }]))
    render(<Chat />)
    expect(await screen.findByRole('button', { name: /ja/i })).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: /nein/i })).toBeInTheDocument()
  })

  it('shows next question', async() => {
    fetch.mockResponse(JSON.stringify([
      { id: 100, text: 'Frage 1', valueOptions: [{ nextId: 200, value: true, text: 'Ja'} ]},
      { id: 200,  text: 'Frage 2',  valueOptions: [] }
    ]))
    render(<Chat />)
    await userEvent.click(await screen.findByRole('button', { name: /ja/i }))
    expect(screen.getByText('Frage 2')).toBeInTheDocument()
  })

  it('shows answer to previous question', async() => {
    fetch.mockResponse(JSON.stringify([
      { id: 100, text: 'Frage 1', valueOptions: [{ nextId: 200, value: true, text: 'Ja'} ]},
      { id: 200,  text: 'Frage 2',  valueOptions: [] }
    ]))
    render(<Chat />)
    await userEvent.click(await screen.findByRole('button', { name: /ja/i }))
    const answers = screen.getByRole('list', { name: /verlauf/i })
    expect(within(answers).getByRole('listitem', { name: /frage 1/i })).toHaveTextContent('Ja')
  })

  it('shows correct question based on given answer', async() => {
    fetch.mockResponse(JSON.stringify([
      { id: 100, text: 'Frage 1', valueOptions: [
        { nextId: 200, value: true, text: 'Ja'},
        { nextId: 300, value: false, text: 'Nein'}
      ]},
      { id: 200,  text: 'Frage 2',  valueOptions: [{ nextId: false, value: 2, text: 'Zwei'}, ] },
      { id: 300,  text: 'Frage 3',  valueOptions: [{ nextId: false, value: 3, text: 'Drei'}, ] },
    ]))
    render(<Chat />)
    await userEvent.click(await screen.findByRole('button', { name: /nein/i }))
    await userEvent.click(await screen.findByRole('button', { name: /drei/i }))
    const answers = await screen.findByRole('list', { name: /verlauf/i })
    expect(within(answers).getByRole('listitem', { name: /frage 3/i })).toHaveTextContent('Drei')
  })

  it('shows thank you message after last question', async () => {
    fetch.mockResponse(JSON.stringify([
      { id: 100, text: 'Frage 1', valueOptions: [{ nextId: false, value: true, text: 'Ja'} ]},
    ]))
    render(<Chat />)
    await userEvent.click(await screen.findByRole('button', { name: /ja/i }))
    expect(await screen.findByText(/dank/i)).toBeInTheDocument()
  })

  it('sends answers after last question', async () => {
    fetch.mockResponse(JSON.stringify([
      { id: 100, name: 'answer1', text: 'Frage 1', valueOptions: [{ nextId: false, value: true, text: 'Ja'} ]},
    ]))
    render(<Chat />)
    await userEvent.click(await screen.findByRole('button', { name: /ja/i }))
    expect(await screen.findByText(/dank/i)).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith(stringContaining('/conversation'), objectContaining({
      method: 'PUT',
      body: JSON.stringify([{ name: 'answer1', value: true }]),
    }))
  })

  it('supports answers of different data type', async () => {
    fetch.mockResponse(JSON.stringify([
      { id: 100, name: 'answer1', text: 'Frage 1', valueOptions: [{ nextId: false, value: 'Value', text: 'Ja'} ]},
    ]))
    render(<Chat />)
    await userEvent.click(await screen.findByRole('button', { name: /ja/i }))
    expect(await screen.findByText(/dank/i)).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledWith(any(String), objectContaining({
      body: JSON.stringify([{ name: 'answer1', value: 'Value' }]),
    }))
  })

  it('shows error message when loading questions fails', async () => {
    fetch.mockRejectedValue(new Error('Network Error'))
    render(<Chat />)
    expect(await screen.findByRole('status', { name: /fehler/i })).toHaveTextContent('Fehler')
  })

  it('shows error message when sending answers fails', async () => {
    fetch.mockResponseOnce(JSON.stringify([
      { id: 100, name: 'answer1', text: 'Frage 1', valueOptions: [{ nextId: false, value: true, text: 'Ja'} ]},
    ]))
    fetch.mockRejectedValue(new Error('Network Error'))
    render(<Chat />)
    await userEvent.click(await screen.findByRole('button', { name: /ja/i }))
    expect(await screen.findByRole('status', { name: /fehler/i })).toHaveTextContent('Fehler')
  })
})
