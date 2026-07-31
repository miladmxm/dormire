"use client";

const CallbackPage = () => {
  return (
    <div>
      <form action="/api/payment/callback?querydata=mili" method="POST">
        <input
          onChange={console.log}
          type="text"
          name="milad"
          value="haminjoori"
        />{" "}
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CallbackPage;
