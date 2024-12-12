import { bookSeat } from '@/actions/booking.actions';
import { Createpaymet, verifyPayment } from '@/actions/Payment.action';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const BookingPage = ({busDetails ,user  }:any) => {

    const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());
    const [paymentid , setPaymentId] = useState<number|null>(null)
      const router = useRouter();
      const p = useParams()
    
      const id = parseInt(p.id as string);


    const handleSeatClick = (seatId: number) => {
        setSelectedSeats((prev) => {
          const newSelectedSeats = new Set(prev);
          if (newSelectedSeats.has(seatId)) {
            newSelectedSeats.delete(seatId);
          } else {
            newSelectedSeats.add(seatId);
          }
          return newSelectedSeats;
        });
      };


        const handlePayment = async (amount: number) => {
          try {
           
            const response = await Createpaymet({ amount }); 
            const options = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
              amount: response.amount,
              currency:'INR',
              name: 'Bus Seat Booking',
              description: 'Payment for bus seat booking',
              order_id: response.id,
      
      
              handler: async (response: any) => { 
                
                console.log('Payment response:', response);
                
                const razorpay_payment_id =  response.razorpay_payment_id;
                const razorpay_order_id  =   response.razorpay_order_id;
                const razorpay_signature =   response.razorpay_signature;
      
                console.log('Payment in client:', 'razorpay_payment_id', razorpay_payment_id, 'razorpay_order_id', razorpay_order_id, 'razorpay_signature', razorpay_signature);
                
                const data = await verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature , amount});
      
                if (data.status === 200 ) {
                  // Handle successful payment here
                  console.log('Payment successful');
                  // Redirect to booking confirmation or ticket page
                  router.push(`/ticket/${data.bookingId}`);
                  setPaymentId(data.paymentId)
      
                  return data.paymetId
                } else {
                  alert('Payment verification failed');
                }
              },
              prefill: {
                name: 'John Doe', // Add user's name dynamically
                email: 'user@example.com', // Add user's email dynamically
              },
              theme: {
                color: '#528FF0',
              },
            };
            const rzp = new (window as any).Razorpay(options); 
            rzp.open();
          } catch (error) {
            console.error('Error creating Razorpay order:', error);
          }
        };
      
      
        const handleSubmit = async () => {
          if (!busDetails || selectedSeats.size === 0) return;
       
          const selectedSeatIds = Array.from(selectedSeats);
      
          const amount = busDetails.bus.price * selectedSeats.size;
          // handlePayment(amount); 
          if(paymentid){
            const result = await bookSeat({
              userId:1,  
             busId: id,
             seatIds: selectedSeatIds,
              paymentId: paymentid!,
         })
         console.log("booked in client",result);
         router.push(`/ticket/${result?.booking.id}`);
          }
      
          // router.refresh()
            
        };


  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold">Bus Seat Booking</h1>
    {/* <p>Total Seats: {busDetails.seats.length}</p> */}

    <div className="grid grid-cols-5 gap-2 mt-4">
      {busDetails.availableSeats?.map((seat:any) => (
        <button
          key={seat.id}
          onClick={() => !seat.isBooked && handleSeatClick(seat.id)}
          disabled={seat.isBooked}
          className={`p-2 rounded ${
            seat.isBooked
              ? 'bg-gray-400 cursor-not-allowed'
              : selectedSeats.has(seat.id)
              ? 'bg-blue-500'
              : 'bg-green-500'
          }`}
        >
          {seat.seatNumber}
        </button>
      ))}
    </div>

    <button
      onClick={handleSubmit}
      className="mt-4 p-2 bg-blue-500 text-white rounded"
    >
      Confirm Booking
    </button>
  </div>
  )
}

export default BookingPage
