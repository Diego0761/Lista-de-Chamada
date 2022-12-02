import './styles.css';
import { Card, CardProps } from '../../components/Card'
import { useState, useEffect, FormEvent } from 'react';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}


function Home() {
  const [studentName, setStudentName] = useState<string>('')
  const [students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  const unknownUserImage = 'https://i.pinimg.com/564x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg'

  function handleAddStudent(e: FormEvent) {
    e.preventDefault()
    
    if(studentName.length === 0) return;

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    }
    
    setStudents(prevState => [...prevState, newStudent])
    setStudentName('')
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/Diego0761")
      const data = await response.json() as ProfileResponse
      setUser({
        name: data.name ?? 'Usuário do Github',
        avatar: data.avatar_url ?? unknownUserImage
      })
    }

    fetchData();
  }, [])
  
  return (
    <div className="container">   
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>

      <form onSubmit={handleAddStudent}>
        <input type="text" placeholder="Digite o nome..." onChange={e => setStudentName(e.target.value)} value={studentName}/>

        <button type="submit">
          Adicionar
        </button>
      </form>

      {
        students.map((student, index) => (
          <Card 
            key={index}
            name={student.name} 
            time={student.time} 
          />
        ))
      }

    </div>
  )
}

export default Home
