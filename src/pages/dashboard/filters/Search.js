/* eslint-disable no-unused-vars */
import InputGroup from 'react-bootstrap/InputGroup'
import { RiSearchLine } from 'react-icons/ri'
import { Col, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useTaskContext } from '@/context/taskContext'

const Search = () => {
  const [textFilter, setTextFilter] = useState('')
  const { tasks, setFilteredTasks } = useTaskContext()

  const handleSearchTasks = (event) => {
    setTextFilter(event.target.value)
  }

  useEffect(() => {
    setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(textFilter.toLowerCase())))
  }, [textFilter])

  return (
        <Col>
            <InputGroup>
                <InputGroup.Text id='basic-addon1'>
                    <RiSearchLine/>
                </InputGroup.Text>
                <Form.Control
                    placeholder='Buscar por título'
                    aria-label='Busqueda'
                    aria-describedby='Barra de busqueda por título'
                    onChange={handleSearchTasks}
                    value={textFilter}
                />
            </InputGroup>
        </Col>
  )
}

export default Search