import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const result = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=22e21ef649526ef2b1be4db6d2b0857d&mode=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data.weather[0].description)
  });

  return NextResponse.json({ code: "Ok" }, { status: 200 });
}