import { setupWorker, rest } from "msw";

const worker = setupWorker(
  rest.get("/api/cats", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          type: "bank-draft",
          title: "Bank Draft",
          position: 0,
          img: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
        },
        {
          type: "bill-of-lading",
          title: "Bill of Lading",
          position: 1,
          img: "https://media.giphy.com/media/11c7UUfN4eoHF6/giphy.gif",
        },
        {
          type: "invoice",
          title: "Invoice",
          position: 2,
          img: "https://media.giphy.com/media/3o85xoi6nNqJQJ95Qc/giphy.gif",
        },
        {
          type: "bank-draft-2",
          title: "Bank Draft 2",
          position: 3,
          img: "https://media.giphy.com/media/nR4L10XlJcSeQ/giphy.gif",
        },
        {
          type: "bill-of-lading-2",
          title: "Bill of Lading 2",
          position: 4,
          img: "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
        },
      ])
    );
  })
);

worker.start();
