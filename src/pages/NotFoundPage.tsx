import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Huudas oldsongui.</p>
      <Link to="/" className="btn-primary">Dashboard руу буцах</Link>
    </div>
  )
}
