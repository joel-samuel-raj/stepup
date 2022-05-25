import { Button, Container, Divider } from "@mui/material"
import Create from "../components/Create"

const Home = () => {

  return (
    <div>
      <Container className="flex justify-between items-center w-full h-screen">
        <div className='w-1/3 flex flex-col justify-center h-full'>
          <Divider className='my-12'></Divider>
          <div>
            <h1 className='text-5xl'>
              Welcome Back
            </h1>
            <p className='mt-4 text-gray-600 '> Join our community to get Started with STEPUP </p>
            <div className='flex justify-between items-center my-4'>
              <Button> Home Page </Button>
              <Button> Telegram </Button>
            </div>
            <p className='p-4 bg-gray-100 text-gray-500'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe  harum tenetur, nemo, ipsa hic labore dicta aperiam cupiditate perferendis sapiente deleniti culpa. Molestiae vel
              <span className='text-black font-semibold'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, quia. </span>
              ihil explicabo ducimus mollitia id nobis maxime fugiat totam enim, fuga accusantium ipsam.
            </p>
          </div>
        </div>
        <div className='w-1/3'>
          <Create />
        </div>
      </Container>
    </div>
  )
}

export default Home
