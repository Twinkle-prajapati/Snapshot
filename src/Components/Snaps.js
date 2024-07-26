import React, { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup, Row, Col, Card } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';

export default function Snaps() {

  const [input, setInput] = useState("Rose")
  const [data, setData] = useState([])
  const[page,setPage]=useState(1)
  const[totalpages,setTotalPages]=useState(0)

  const API_KEY = "O5t1IZfCLELtqWc_XbWD8MyWm_CN_oUt_LSYvycjdS4";
  const IMAGES_PER_PAGE  = 12;

  useEffect(()=>{
    handleSearch(input)
  },[page])

  useEffect(()=>{
    setPage(1)
  },[input])



  async function handleSearch(SearchTerm) {
    setInput(SearchTerm)
    let res = await fetch(`https://api.unsplash.com/search/photos?query=${SearchTerm}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${API_KEY}`, {
      method: 'GET'
    })
    res = await res.json();
    console.log("message", res);

    if (res) {
      setData(res.results)
      setTotalPages(res.total_pages)

    }

  }

  return (
    <>
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-100'>
        <h1 className='p-3 mt-5' style={{ color: "#9B86BD" }}>Explore Our Snapshot Image Search</h1>
        <InputGroup className="w-50 w-md-75 w-lg-50">
          <Form.Control
            placeholder="Search your images here"
            className='px-3 py-2'
            value={input}
            onChange={(e) => { setInput(e.target.value) }}
          />
          <InputGroup.Text style={{ backgroundColor: "#9B86BD" }}>
            <SearchIcon className='text-white' onClick={() => handleSearch(input)} />
          </InputGroup.Text>
        </InputGroup>
        <Row className='p-3 w-100 justify-content-center'>
          <Col xs="auto" className='my-1'>
            <Button className='border-0' style={{ backgroundColor: "#9B86BD" }} onClick={() => handleSearch('Mountains')}>Mountains</Button>
          </Col>
          <Col xs="auto" className='my-1'>
            <Button className='border-0' style={{ backgroundColor: "#9B86BD" }} onClick={() => handleSearch('Food')}>Food</Button>
          </Col>
          <Col xs="auto" className='my-1'>
            <Button className='border-0' style={{ backgroundColor: "#9B86BD" }} onClick={() => handleSearch('Nature')}>Nature</Button>
          </Col>
          <Col xs="auto" className='my-1'>
            <Button className='border-0' style={{ backgroundColor: "#9B86BD" }} onClick={() => handleSearch('Flowers')}>Flowers</Button>
          </Col>
          <Col xs="auto" className='my-1'>
            <Button className='border-0' style={{ backgroundColor: "#9B86BD" }} onClick={() => handleSearch('Clothes')}>Clothes</Button>
          </Col>
        </Row>


        <Row className='w-100 mt-3'>
        {input.trim() === "" ?
        (<h1 className='text-center'>Enter Search Term to find images</h1>)
        :(
          data.map((item) => (
            <Col lg={3} md={4} sm={6} xs={12} className='my-2'>
              <Card key={item.id} style={{width:"100%", height: "13rem" }} className='m-2'>
                <Card.Img  style={{height: "100%" , objectFit: "cover" }} src={item.urls.small}></Card.Img>
              </Card>
            </Col>
          ))

        )}
        </Row>

        {data.length > 0 && (
        <div className='d-flex justify-content-end w-100 p-3'>
         {page > 1 ? (<Button className='mx-2 border-0' style={{ backgroundColor: "#9B86BD" }} onClick={()=>setPage(page-1)}>PREVIOUS</Button>):("")}
         {page < totalpages ? (<Button className='border-0' style={{ backgroundColor: "#9B86BD" }} onClick={()=>setPage(page+1)}>NEXT</Button>):("")}
        </div>)}
      </Container>
    </>
  )
}