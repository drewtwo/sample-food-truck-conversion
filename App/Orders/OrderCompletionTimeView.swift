/*
See the LICENSE.txt file for this sample's licensing information.

Abstract:
A view that displays order completion time analytics.
*/

import SwiftUI
import FoodTruckKit

struct OrderCompletionTimeView: View {
    let analytics: OrderAnalytics

    var body: some View {
        if analytics.completedOrderCount == 0 {
            emptyState
        } else {
            statsGrid
        }
    }

    // MARK: - Subviews

    private var emptyState: some View {
        HStack {
            Image(systemName: "clock")
                .foregroundStyle(.secondary)
            Text("No completed orders yet")
                .foregroundStyle(.secondary)
                .font(.subheadline)
        }
        .padding(.vertical, 4)
    }

    private var statsGrid: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Completion Time Analytics")
                .font(.headline)

            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                statCell(
                    title: NSLocalizedString("Average", comment: "Completion time stat label."),
                    value: analytics.averageCompletionMinutes,
                    systemImage: "chart.bar"
                )
                statCell(
                    title: NSLocalizedString("Median", comment: "Completion time stat label."),
                    value: analytics.medianCompletionMinutes,
                    systemImage: "chart.bar.xaxis"
                )
                statCell(
                    title: NSLocalizedString("Fastest", comment: "Completion time stat label."),
                    value: analytics.minimumCompletionMinutes,
                    systemImage: "hare"
                )
                statCell(
                    title: NSLocalizedString("Slowest", comment: "Completion time stat label."),
                    value: analytics.maximumCompletionMinutes,
                    systemImage: "tortoise"
                )
            }

            Text("Based on \(analytics.completedOrderCount) completed order(s)")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding()
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
    }

    private func statCell(title: String, value: Double?, systemImage: String) -> some View {
        VStack(alignment: .leading, spacing: 4) {
            Label(title, systemImage: systemImage)
                .font(.caption)
                .foregroundStyle(.secondary)
            if let value {
                Text(formattedMinutes(value))
                    .font(.title3.bold())
                    .foregroundStyle(.primary)
            } else {
                Text("—")
                    .font(.title3.bold())
                    .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(10)
        .background(.background, in: RoundedRectangle(cornerRadius: 8))
    }

    // MARK: - Helpers

    private func formattedMinutes(_ minutes: Double) -> String {
        if minutes < 1 {
            let seconds = Int(minutes * 60)
            return "\(seconds)s"
        } else if minutes < 60 {
            return String(format: "%.1f min", minutes)
        } else {
            let hours = minutes / 60
            return String(format: "%.1f hr", hours)
        }
    }
}

// MARK: - Previews

struct OrderCompletionTimeView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            // With data
            OrderCompletionTimeView(
                analytics: OrderAnalytics(orders: {
                    var orders = Order.previewArray
                    for i in orders.indices {
                        orders[i].completedAt = Date(timeIntervalSinceNow: -Double.random(in: 120...600))
                    }
                    return orders
                }())
            )
            .previewDisplayName("With Data")

            // Empty state
            OrderCompletionTimeView(analytics: OrderAnalytics(orders: []))
                .previewDisplayName("Empty")
        }
        .padding()
        .previewLayout(.sizeThatFits)
    }
}
