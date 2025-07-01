<?php

namespace App\Http\Controllers;

use App\Http\Resources\LiveStream\LiveStreamResource;
use App\Models\LiveStream\LiveStream;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LiveStreamController extends Controller
{
    public function index()
    {
        $featuredLiveStream = LiveStream::query()

        ->with(['category', 'instructor'])
            // ->where('live_at', '>', now())
            ->whereNull('live_end_at')
            ->orderBy('live_at')
            ->first();

        if ($featuredLiveStream) {
            $featuredLiveStream = new LiveStreamResource($featuredLiveStream);
        }

        return inertia('LiveStream/LiveStream', compact(['featuredLiveStream']));
    }

    public function show(LiveStream $liveStream)
    {
        _user()->load(['bookmarkedLiveStream']);

        $selected_livestream = LiveStream::where('id',$liveStream->id)->first();
        if($selected_livestream->disabled == true){
            return redirect()->route('livestream.index');
        }

        $selected_livestream = LiveStream::where('id',$liveStream->id)->first();
        if($selected_livestream->disabled == true){
            return redirect()->route('livestream.index');
        }

        $liveStream = new LiveStreamResource(
            $liveStream->load([
                'category',
                'instructor',
                'note' => fn ($note) => $note->where('user_id', _user()->id)
            ])
        );

        return inertia('LiveStream/LiveStreamSession', compact(['liveStream']));
    }

    public function getUpcoming()
    {
        $now = Carbon::now('America/New_York');

        // $response = LiveStreamResource::collection(
        //     LiveStream::whereNull('live_end_at')->where('live_at', '>', now())->with(['category', 'instructor'])->orderBy('live_at')->get()
        // );

        // all livestreams whop are not ended whether date has passed or not
        $response = LiveStreamResource::collection(
            LiveStream::whereNull('live_end_at')->with(['category', 'instructor'])->orderBy('live_at')->get()
        );

        return $this->sendResponse($response);
    }

    // sing page link

    // public function getPast(Request $request)
    // {
    //     $order = $request->query('order', 'asc');

    //     if (!in_array($order, ['asc', 'desc'])) {
    //         $order = 'asc';
    //     }

    //     $response = LiveStreamResource::collection(
    //         LiveStream::whereNotNull('live_end_at')->with(['category', 'instructor'])
    //             ->orderBy('live_at', $order)
    //             ->paginate(12)
    //     )->resource;
    //     $url = route('livestream.index');
    //      $response->withPath($url);

    //     return $this->sendResponse($response);
    // }

    public function Past(Request $request)
    {
        $featuredLiveStream = LiveStream::query()

        ->with(['category', 'instructor'])
            // ->where('live_at', '>', now())
            ->whereNull('live_end_at')
            ->orderBy('live_at')
            ->first();

        if ($featuredLiveStream) {
            $featuredLiveStream = new LiveStreamResource($featuredLiveStream);
        }

        // Fetch past live streams
        //     $pastLiveStreams = LiveStreamResource::collection(
        //     LiveStream::query()
        //     ->whereNotNull('live_end_at')->with(['category', 'instructor'])
        //     ->orderBy('live_at', 'desc')
        //     ->paginate(12)
        // )->resource;
        // if ($request->wantsJson()) {
        //     return $this->sendResponse($pastLiveStreams);
        // }

        return inertia('LiveStream/PastLiveStream', compact(['featuredLiveStream']));
    }

    public function getPast(Request $request)
    {


        $order = $request->query('order', 'desc');
        $page = $request->query('page', 1);

            $response = LiveStreamResource::collection(
                LiveStream::query()
                ->whereNotNull('live_end_at')->with(['category', 'instructor'])
                ->orderBy('live_at', $order)
                ->skip(12*($request->page-1))
                ->take(12)
                ->get()
            )->resource;
            // $url = route('livestream.past');
            //  $response->withPath($url);
            $next_page = Null;
            if(!empty($response)){
            $next_page = $page+1;
            }
            return $this->sendResponse(['data' => $response , 'next_page' => $next_page ]);
        }




    public function storeNote(Request $request, LiveStream $liveStream)
    {
        $request->validate([
            'content' => 'nullable|string',
        ]);

        $liveStream->note()->updateOrCreate([
            'user_id' => $request->user()->id
        ], [
            'content' => $request->input('content'),
        ]);

        return $this->sendResponse([], __('Notes Saved.'));
    }
}
