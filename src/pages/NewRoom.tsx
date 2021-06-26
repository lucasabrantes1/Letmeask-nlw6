import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import Illustration from '../assets/images/illustration.svg'
import Logo from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import userEvent from '@testing-library/user-event'
// import { AuthContext } from '../context/AuthContext'
// import { useContext } from 'react'




export function NewRoom(){

    const { user } = useAuth()
    const [newRoom, setNewRoom] = useState('')
    const history = useHistory()

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        
      if (newRoom.trim() === ''){
        return;
      }

      const roomRef = database.ref('rooms');

      const firebaseRoom = await roomRef.push({
          title: newRoom,
          authorId: user?.id,
      })

        history.push(`/room/${firebaseRoom.key}`)

    }

    

  
    return (
        <div id="page-auth">
            <aside>
                <img src={Illustration} alt="illustration" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>

                <div className='main-content'>
                    <img src={Logo} alt="Logo" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit">
                          Criar sala
                       </Button>
                    </form>
                    <p>
                      Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
 }