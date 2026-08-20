<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StockTakeProgress implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $headerId;
    public int $current;
    public int $total;
    public string $itemCode;
    public string $status;
    public string $error;
    public bool $isDone;

    public function __construct(int $headerId, int $current, int $total, string $itemCode, string $status = 'ok', string $error = '')
    {
        $this->headerId = $headerId;
        $this->current = $current;
        $this->total = $total;
        $this->itemCode = $itemCode;
        $this->status = $status;
        $this->error = $error;
        $this->isDone = $current >= $total;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('stocktake.' . $this->headerId),
        ];
    }

    public function broadcastAs(): string
    {
        return 'StockTakeProgress';
    }

    public function broadcastWith(): array
    {
        return [
            'headerId' => $this->headerId,
            'current' => $this->current,
            'total' => $this->total,
            'itemCode' => $this->itemCode,
            'status' => $this->status,
            'error' => $this->error,
            'isDone' => $this->isDone,
        ];
    }
}
