import Card from "../util/bkkcard";

function HomePage() {
  return (
    <div>
      <h1 style={{ marginLeft: "30px", color: "blue" }}>
        Welcome to Home Page
      </h1>
      <div style={{ marginLeft: "30px", display: "flex", gap: "20px", justifyContent: "center" }}>
        <Card>
            <h2>Card 1</h2>
            <p>This is card 1</p>
        </Card>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default HomePage;
