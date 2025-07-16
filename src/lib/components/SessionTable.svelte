<script lang="ts">
	
	type Session = {
		id: number;
		createdAt: string;
		plannedDuration: number;
		totalStudyTime: number;
		totalPauseTime: number;
		totalPauses: number;
		focusScore: number;
	};

	let {
		sessions,
		onSessionSelect
	}: { sessions: Session[]; onSessionSelect: (sessionId: number) => void } = $props();

	function formatDuration(seconds: number): string {
		return new Date(seconds * 1000).toISOString().slice(14, 19);
	}
</script>


<div class="table-container">

    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Planned Duration</th>
                <th>Total Study Time</th>
                <th>Total Pause Time</th>
                <th>Total Pauses</th>
                <th>Focus Score</th>
            </tr>
        </thead>
        <tbody>
            {#if sessions.length === 0}
            <tr>
                <td colspan="6">No sessions found.</td>
            </tr>
            {/if}
            {#each sessions as session}
            <tr onclick={() => onSessionSelect(session.id)} title="Click to see details">

                <td>{new Date((session.createdAt)).toLocaleDateString()}</td>
                <td>{formatDuration(session.plannedDuration)}</td>
                <td>{formatDuration(session.totalStudyTime)}</td>
                <td>{formatDuration(session.totalPauseTime)}</td>
                <td>{session.totalPauses}</td>
                <td>{session.focusScore}%</td>

            </tr>
            {/each}
        </tbody>
    </table>

</div>


<style>
	.table-container {
		overflow-x: auto;
		border: 1px solid #444;
		border-radius: 8px;
		background-color: rgba(0, 0, 0, 0.2);
	}
	table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
	}
	th, td {
		padding: 0.75rem 1rem;
		border-bottom: 1px solid #444;
	}
	thead {
		background-color: rgba(255, 255, 255, 0.1);
	}
	tbody tr {
		cursor: pointer;
		transition: background-color 0.2s ease;
	}
	tbody tr:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}
	tbody tr:last-child td {
		border-bottom: none;
	}
</style>